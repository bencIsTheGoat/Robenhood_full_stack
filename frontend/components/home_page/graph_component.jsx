import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';
import { getStockData } from '../../util/company_api_util';

class Graph extends React.Component {

    constructor(props) {
        // debugger;
        super(props);
        this.state = {};
        this.getSharesObj = this.getSharesObj.bind(this);
        this.dateHelper = this.dateHelper.bind(this);
        this.getNumShares = this.getNumShares.bind(this);
        this.formatData = this.formatData.bind(this);
        this.uniqueCompanies = this.uniqueCompanies.bind(this);
        this.portValueObj = this.portValueObj.bind(this);
        
    }

    // first adds all transactions made by user to state
    // then fetches all companys that user has thru transactions
    // then fetches 5yr data and puts into local state then(() => this.getData('5yr'))

    componentDidMount() {
        this.props.fetchTransactions()
            .then(() => this.props.fetchCompanies())
            .then(() => this.getData('5y'))
            .then(() => setTimeout(() => this.formatData(this.portValueObj()), 500))
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
        debugger;
        return portObj;
       
    }

    // turns data into array so line can render and setState with formatted data

    formatData(data) {
        let days = Object.keys(data);
        let newData = days.map((day, idx) => {
            return {
                name: day,
                price: data[day]
            }
        })
        debugger;
        this.setState({data: newData});
    }


    render () {
        // debugger;
        return (
            <div>
                <div className='line-div'>
                    <LineChart width={676} height={196} data={this.state.data}>
                        <Line type='monotone' dataKey='price' stroke='#21ce99'/>
                        <Tooltip />
                    </LineChart>
                </div>
                <div className='graph-button-div'>
                
                </div>
            </div>
         
        )
    }

}

export default Graph;



