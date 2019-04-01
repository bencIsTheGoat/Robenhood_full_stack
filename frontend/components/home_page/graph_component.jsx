import React from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { getStockData } from '../../util/company_api_util';

class Graph extends React.Component {

    constructor(props) {
        // debugger;
        super(props);
        this.state = {data: {}, line: {}};
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
        this.props.fetchTransactions()
            .then(() => this.props.fetchCompanies())
            .then(() => this.getData('5y'))
            .then(() => setTimeout(() => this.formatData(this.portValueObj()), 1000))
    }

    // TEST

    dateHelper (date) {
        let today = new Date();
        let past = new Date(date);
        let difference = Math.abs((today - past) / 1000 / 60 / 60 / 24 / 7 / 52 * 5 * 52);
        return Math.floor(1257);

    }

    // gets the transaction for each company { companyIds: [{transactions}, ...]}

    getSharesObj () {
        let sharesObj = {};
        let transactions = this.props.transactions;
        transactions.forEach(trans => {
            if (sharesObj[trans.company_id] === undefined) {
                sharesObj[trans.company_id] = [{ 
                    transaction_type: trans.transaction_type,
                    date: this.dateHelper(trans.date),
                    shares: trans.shares
                 }]
            } else {
                sharesObj[trans.company_id].push({
                        transaction_type: trans.transaction_type,
                        date: this.dateHelper(trans.date),
                        shares: trans.shares
                    })
            }
        });
        return sharesObj;
    }

    getNumShares () {
        let sharesObj = this.getSharesObj();
        let company_ids = Object.keys(sharesObj);
        let numSharesObj = {};
        company_ids.forEach(id => {
            numSharesObj[id] = {
                rateOfChange: [...Array(sharesObj[id][0].date + 1)].fill(0),
                integral: [...Array(sharesObj[id][0].date + 1)].fill(0)
            }; 
        });
        let arr1;
        company_ids.forEach(id => {
            arr1 = numSharesObj[id]['rateOfChange'];
            sharesObj[id].forEach(trans => {
                if (trans.transaction_type.toLowerCase() === 'buy') {
                    arr1[arr1.length - trans.date - 1] += trans.shares;
                } else {
                    arr1[arr1.length - trans.date - 1] -= trans.shares;
                }
            });
        });
        let datesObj = {};
        let output = {};
        let companies = this.props.companies;
        let tickersObj = this.tickerToId();
        company_ids.forEach(id => {
            let companyTicker = tickersObj[id];
            let datesData = this.props.data[companyTicker];
            arr1 = numSharesObj[id]['rateOfChange'];
            arr1.forEach((ele, idx) => {
                let date = datesData[idx].date;
                if (idx === 0) {
                    datesObj[date] = arr1[idx];
                } else {
                    let dateBefore = datesData[idx - 1].date;
                    datesObj[date] = datesObj[dateBefore] + arr1[idx];
                }
            })
            if (output[id] === undefined) {
                output[id] = datesObj;
            } else {
                output[id].push(datesObj)
            }
        });
        Object.keys(output).forEach((companyId) => {
            let array = Object.keys(output[companyId]).map((ele, idx) => {
                return { date: ele, shares: output[companyId][ele] }
            });
            output[companyId] = array;
        });
        return output;
    }

    tickerToId() {
        let companies = {}
        this.props.companies.forEach(company => (
            companies[company.id] = company.ticker
        ));
        return companies;
    }

    // gets unique companies from state

    uniqueCompanies () {
        let companies = {}
        this.props.companies.forEach(company => (
            companies[company.ticker] = company.id
        ));
        return companies;
    }

    // shoots off external ajax for company price data

    getData (time) {
        const tickers = Object.keys(this.uniqueCompanies());
        const stockData = this.props.getStockData
        tickers.forEach(ticker => {
            stockData(ticker, time)
        });
    }

    // portfolio value

    dateToPrice (ticker) {
        let priceObj = {};
        Object.values(this.props.data[ticker]).forEach(data => {
            priceObj[data.date] = data.close;
        });
        return priceObj;
    }

    portValueObj () {
        const companyObj = this.tickerToId();
        const sharesObj = this.getNumShares();
        const data = this.props.data;
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
    // const USD = value => currency(value, {symbol: 'S', precision: 2});

    formatData(data) {
        let days = Object.keys(data);
        let newData = days.map(day => {
            let jsDate = new Date(day);
            let dateArr = jsDate.toDateString().slice(4).split(' ');
            let newDate = dateArr[0] + ' ' + dateArr[1] + ', ' + dateArr[2];
            
            return {
                Date: newDate,
                Price: data[day]
            }
        })
        this.setState({data: newData, line: newData});
    }

    // performance

    percentChange (currentValue) {
        let initialPrice = this.state.data[0].Price;
        let percent = (((currentValue - initialPrice) / initialPrice) * 100).toFixed(2);
        return `(${percent}%)`
    }

    monetaryChange (currentValue) {
        let initialPrice = this.state.data[0].Price;
        let change = (currentValue - initialPrice).toFixed(2);
        if (change > 0) {
            return `+$${Math.abs(change)}`;
        } else {
            return `-$${Math.abs(change)}`;
        }
    }
    

    lineRender() {
        return (
            <LineChart width={676} height={196} data={this.state.data}>
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
               
                    <Label position='insideTopLeft' value='test' position={{ y: -100, x: 50 }}/>

                </YAxis>
                
                
                <Tooltip 
                    className='tooltip'
                    contentStyle={{border: '0', backgroundColor: 'transparent'}}
                    position={{y: -100, x: 50}}
                    isAnimationActive={false}
                    labelFormatter={value => <div className='date-div'>{value}</div>}
                    formatter={value => {
                        value = value.toFixed(2);
                        let percent = this.percentChange(value);
                        let money = this.monetaryChange(value);
                        return [
                            <div className='tooltip-value-div'>
                                <p className='portval-p'>
                                    {'$' + new Intl.NumberFormat('en').format(value)}
                                </p>
                                <div className='tooltip-change-div'>
                                    <p>{percent} {money}</p>
                                </div>
                            </div>, null
                        ]
                    }}
                    
                />
                <Tooltip

                />
                
                
            </LineChart>
        )
    }

    // handles button functionality

    handleClick(timePeriod) {
        Object.freeze(this.state.line);
        let data = this.state.line;
        let line = this.state.line
        let dataLength = this.state.line.length;
        let newData;
        if (timePeriod === '1m') {
            newData = data.slice(dataLength - 22);
            this.setState({data: newData, line: line});
        } else if (timePeriod === '1w') {
            newData = data.slice(dataLength - 5);
            this.setState({ data: newData, line: line });
        } else if (timePeriod === '3m') {
            newData = data.slice(dataLength - 65);
            this.setState({ data: newData, line: line });
        } else if (timePeriod === '1y') {
            newData = data.slice(dataLength - 260);
            this.setState({ data: newData, line: line });
        } else if (timePeriod === '1d') {
            newData = data.slice(dataLength - 2);
            this.setState({ data: newData, line: line });
        } else {
            newData = data;
            this.setState({ data: newData, line: line });
        }

    }

    // handles top component change

    portInfo () {

    }


    render () {
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
            </div>
         
        )
    }

}

export default Graph;



