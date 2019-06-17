import React from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { fetchCompanies, getMultipleStockData } from '../../util/company_api_util';
import { fetchTransactions } from '../../util/transaction_api_util';

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: [], line: [], companies: [], transaction: []};
        this.getSharesObj = this.getSharesObj.bind(this);
        this.dateHelper = this.dateHelper.bind(this);
        this.getNumShares = this.getNumShares.bind(this);
        this.formatData = this.formatData.bind(this);
        this.uniqueCompanies = this.uniqueCompanies.bind(this);
        this.portValueObj = this.portValueObj.bind(this);
        this.lineRender = this.lineRender.bind(this);
        this.monetaryChange = this.monetaryChange.bind(this);
        this.percentChange = this.percentChange.bind(this);
    }

    // first adds all transactions made by user to state
    // then fetches all companys that user has thru transactions
    // then fetches 5yr data and puts into local state then(() => this.getData('5yr'))

    componentDidMount() {
        this.props.startLoad();
        fetchTransactions()
        .then((transactions) => {
            this.setState({transactions: transactions});
        })
        .then(() => fetchCompanies().then(companies => {
            this.setState({companies: companies});
        }))
        .then(() => {
            return getMultipleStockData(this.formatTickers(), '5y').then(data => {
                this.setState({data: data});
            })
        })
        .then(() => {
            this.formatData(this.portValueObj());
        })   
    }

    formatTickers() {
        const companiesObj = {};
        this.state.transactions.forEach(trans => {
            let companies = this.state.companies;
            for (let i = 0; i < companies.length - 1; i++) {
                if (companies[i].id === trans.company_id) {
                    companiesObj[companies[i].ticker] = trans.company_id;
                }
            }
        })
        const tickers = Object.keys(companiesObj).map(ticker => {
            return ticker.toLowerCase();
        })
        return tickers.join(','); 
    }


    sendPortData () {
        const currentValue = this.state.linedata.last.Price;
        const percent = this.percentChange(currentValue);
        const gain = this.monetaryChange(currentValue);
        const portData = { currentValue: currentValue, percent: percent, gain: gain };
        this.props.sendPortData(portData);
        this.setState({ linedata: newData, line: newData, portData: portData });
    }

    dateHelper (date) {
        const today = new Date();
        const past = new Date(date);
        const difference = Math.abs((today - past) / 1000 / 60 / 60 / 24 / 7 / 52 * 5 * 52);
        return Math.ceil(difference);
    }

    getSharesObj () {
        const sharesObj = {};
        const { transactions } = this.state;
        transactions.forEach(trans => {
            if (sharesObj[trans.company_id] === undefined) {
                sharesObj[trans.company_id] = [{ 
                    transaction_type: trans.transaction_type,
                    date: this.dateHelper(trans.date),
                    shares: trans.shares
                }];
            } else {
                sharesObj[trans.company_id].push({
                        transaction_type: trans.transaction_type,
                        date: this.dateHelper(trans.date),
                        shares: trans.shares
                });
            }
        });
        return sharesObj;
    }

    getNumShares () {
        const sharesObj = this.getSharesObj();
        const company_ids = Object.keys(sharesObj);
        const numSharesObj = {};
        company_ids.forEach(id => {
            let len = sharesObj[id].length - 1
            numSharesObj[id] = {
                rateOfChange: [...Array(sharesObj[id][len].date)].fill(0),
                integral: [...Array(sharesObj[id][len].date)].fill(0)
            }; 
        });
        let arr1;
        company_ids.forEach(id => {
            arr1 = numSharesObj[id]['rateOfChange'];
            sharesObj[id].forEach(trans => {
                if (trans.transaction_type.toLowerCase() === 'buy') {
                    arr1[arr1.length - trans.date] += trans.shares;
                } else {
                    arr1[arr1.length - trans.date] -= trans.shares;
                };
            });
        });
        const output = {};
        const tickersObj = this.tickerToId();
        company_ids.forEach(id => {
            const datesObj = {};
            const companyTicker = tickersObj[id];
            const datesData = this.state.data[companyTicker];
            arr1 = numSharesObj[id]['rateOfChange'];
            arr1.forEach((ele, idx) => {
                let arrIdx = datesData.chart.length - arr1.length + idx
                let date = datesData.chart[arrIdx].date;
                if (idx === 0) {
                    datesObj[date] = arr1[idx];
                } else {
                    let dateBefore = datesData.chart[arrIdx - 1].date;
                    datesObj[date] = datesObj[dateBefore] + arr1[idx];
                }
            })
            output[id] = datesObj;
        });
        Object.keys(output).forEach((companyId) => {
            let array = Object.keys(output[companyId]).map((ele, idx) => {
                return { date: ele, shares: output[companyId][ele] }
            });
            output[companyId] = array;
        });
        this.props.sendSharesData(output);
        return output;
    }

    tickerToId() {
        const companies = {};
        this.state.companies.forEach(company => companies[company.id] = company.ticker);
        return companies;
    }

    uniqueCompanies () {
        const companies = {};
        this.state.companies.forEach(company => companies[company.ticker] = company.id)
        return companies;
    }

    dateToPrice (ticker) {
        const priceObj = {};
        Object.values(this.state.data[ticker]).forEach(data => {
            data.forEach(dataPoint => priceObj[dataPoint.date] = dataPoint.close)
        });
        return priceObj;
    }

    portValueObj () {
        const companyObj = this.tickerToId();
        const sharesObj = this.getNumShares();
        const portObj = {};
        Object.keys(sharesObj).forEach(companyId => {
            let ticker = companyObj[companyId]
            let priceData = this.dateToPrice(ticker);
            Object.values(sharesObj[companyId]).forEach((dataPair, idx) => {
                if (portObj[dataPair.date] === undefined) {
                    portObj[dataPair.date] = dataPair.shares * priceData[dataPair.date]
                } else {
                    portObj[dataPair.date] += dataPair.shares * priceData[dataPair.date]
                }
            });
        });
        return portObj;
       
    }

    // turns data into array so line can render and setState with formatted data

    formatData(data) {
        const days = Object.keys(data);
        const newData = days.map(day => {
            let jsDate = new Date(day);
            let dateArr = jsDate.toDateString().slice(4).split(' ');
            let newDate = dateArr[0] + ' ' + dateArr[1] + ', ' + dateArr[2];
            return {
                Date: newDate,
                Price: data[day]
            };
        })
        const sorted = this.quickSort(newData);
        this.setState({linedata: sorted, line: sorted});
    }

    quickSort(array) {
        if (array.length <= 1) return array;
        const first = array[0];
        const left = [];
        const right = [];
        for (let i = 1; i < array.length; i++) {
            if (new Date (first.Date) > new Date (array[i].Date)) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        return this.quickSort(left).concat([first]).concat(this.quickSort(right));
    }

    // performance

    percentChange (currentValue) {
        const initialPrice = this.state.linedata[0].Price;
        const percent = (((currentValue - initialPrice) / initialPrice) * 100).toFixed(2);
        return `(${percent}%)`
    }

    monetaryChange (currentValue) {
        const initialPrice = this.state.linedata[0].Price;
        const change = (currentValue - initialPrice).toFixed(2);
        if (change > 0) {
            return `+$${Math.abs(change)}`;
        } else {
            return `-$${Math.abs(change)}`;
        }
    }
    

    lineRender() {
        return (
            <LineChart width={700} height={196} data={this.state.linedata}>
                <Line 
                    type='monotone' 
                    dataKey='Price' 
                    stroke='#21ce99' 
                    dot={false} 
                    strokeWidth={2}
                />
                <XAxis dataKey='Date' hide={true} width={676}/>
                <YAxis 
                    type='number' 
                    domain={['dataMin', 'dataMax']} 
                    stroke="white" 
                >
                </YAxis>
                <Tooltip 
                    className='tooltip'
                    contentStyle={{border: '0', backgroundColor: 'transparent'}}
                    position={{y: -120, x: 50}}
                    isAnimationActive={false}
                    labelFormatter={value => <div className='date-div'>{value}</div>}
                    active={true}
                    formatter={value => {
                        value = value.toFixed(2);
                        const percent = this.percentChange(value);
                        const money = this.monetaryChange(value);
                        return [
                            <div className='tooltip-value-div'>
                                <p className='portval-p'>
                                    {'$' + new Intl.NumberFormat('en').format(value)}
                                </p>
                                <div className='tooltip-change-div'>
                                    <p>{money} {percent}</p>
                                </div>
                            </div>, null
                        ]
                    }} 
                />
            </LineChart>
        )
    }

    // handles button functionality

    handleClick(timePeriod) {
        Object.freeze(this.state.line);
        let data = this.state.line;
        let { line } = this.state;
        let dataLength = line.length;
        let newData;
        if (timePeriod === '1m') {
            newData = data.slice(dataLength - 22);
            this.setState({linedata: newData, line: line});
        } else if (timePeriod === '1w') {
            newData = data.slice(dataLength - 5);
            this.setState({ linedata: newData, line: line });
        } else if (timePeriod === '3m') {
            newData = data.slice(dataLength - 65);
            this.setState({ linedata: newData, line: line });
        } else if (timePeriod === '1y') {
            newData = data.slice(dataLength - 260);
            this.setState({ linedata: newData, line: line });
        } else if (timePeriod === '1d') {
            newData = data.slice(dataLength - 2);
            this.setState({ linedata: newData, line: line });
        } else {
            newData = data;
            this.setState({ linedata: newData, line: line });
        }
    }

    // handles top component change

    render () {
        if (this.state.companies.length === 0 || this.state.transactions.length === 0 || this.state.data.length === 0) {
            return (<div className='graph-div'>
                    <h1 className='graph-message'>
                    </h1>
            </div>)
        } else {
            this.props.stopLoad();
            return (
                <div className='graph-div'>
                    <div className='line-div'>
                        {this.lineRender()}
                    </div>
                    <div className='graph-button-div'>
                        <button className='graph-button' onClick={() => this.handleClick('1d')}>
                            1D
                        </button>
                        <button className='graph-button' onClick={() => this.handleClick('1w')}>
                            1W
                        </button>
                        <button className='graph-button' onClick={() => this.handleClick('1m')}>
                            1M
                        </button>
                        <button className='graph-button' onClick={() => this.handleClick('3m')}>
                            3M
                        </button>
                        <button className='graph-button' onClick={() => this.handleClick('1y')}>
                            1Y
                        </button>
                        <button className='graph-button' onClick={() => this.handleClick('all')}>
                            ALL
                        </button>
                    </div>
                </div>)
        }    
    }
    
}



export default Graph;



