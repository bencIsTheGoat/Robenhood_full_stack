import React from 'react';
import { LineChart, Line } from 'recharts';
import { getStockData } from '../../util/company_api_util';

class Graph extends React.Component {

    constructor(props) {
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
        .then(() => this.props.fetchCompanies()
        .then(() => this.getData('5y')
        .then(() => this.formatData(this.portValueObj()))))
    }

    // TEST

    
 
    dateHelper (date) {
        let today = new Date();
        let past = new Date(date);
        let difference = Math.abs((today - past) / 1000 / 60 / 60 / 24 / 7 / 52 * 5 * 52);
        return Math.floor(1255);
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
        let arr2;
        let output = {};
        company_ids.forEach(id => {
            arr2 = numSharesObj[id]['integral'];
            arr1 = numSharesObj[id]['rateOfChange'];
            arr2.forEach((ele, idx) => {
                if (idx === 0) {
                    arr2[idx] = arr1[idx];
                } else {
                    arr2[idx] = arr2[idx - 1] + arr1[idx];
                }
            })
            output[id] = arr2;
        });
        return output;
    }

    // formats data to go in chart

    

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
        const stockData = this.props.getStockData;
        tickers.forEach(ticker => {
            stockData(ticker, time)
        });
    
    }

    tickerToId () {
        let companies = {}
        this.props.companies.forEach(company => (
            companies[company.id] = company.ticker
        ));
        return companies;
    }

    // portfolio value

    // loop thru sharesObj keys to get compnayIDs, id =>
    // sharesObj[id] = arry need to iterate
    // for (let i = arry.length - 1; i > 0; i--)
    // let priceData = this.props.data[tickerToId[id]]
    // portObj[i] = arry[i] * priceData[priceData.length - i - 1]

    portValueObj () {
        const companyObj = this.tickerToId();
        const sharesObj = this.getNumShares();
        const data = this.props.data;
        const portObj = {};
        Object.keys(sharesObj).forEach(id => {
            let sharesArray = sharesObj[id];
            let j = 1;
            for (let i = sharesArray.length - 1; i >= 0; i--) {
                let priceData = data[companyObj[id]]
                if (portObj[i] === undefined) {
                    portObj[i] = sharesArray[i] * priceData[priceData.length - j].close
                } else {
                    portObj[i] += sharesArray[i] * priceData[priceData.length - j].close
                }
                j++;
            }
        });
        return portObj;
    }

    formatData(data) {
        let days = Object.keys(data);
        let newData = days.map(day => {
            return {
                name: day,
                uv: data[day]
            }
        })
        this.setState({data: newData});
    }


    render () {
        return (
            <div>
                <div className='line-div'>
                    <LineChart width={400} height={400} data={this.state.data}>
                        <Line type='monotone' dataKey='uv' stroke='#21ce99'/>
                    </LineChart>
                </div>
                <button onClick={() => this.formatData(this.portValueObj())}>
                    TEST
                </button>
            </div>
         
        )
    }

}

export default Graph;



