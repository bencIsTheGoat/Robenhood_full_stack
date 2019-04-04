import React from 'react';
import { getStockData } from '../../util/company_api_util';
import { fetchCompanies, getMultipleStockData } from '../../util/company_api_util';
import { fetchTransactions } from '../../util/transaction_api_util';
import { Link } from 'react-router-dom';

class StockIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            numShares: [],
            prices: {}}
        this.renderStocks = this.renderStocks.bind(this);
        this.priceHelper = this.priceHelper.bind(this);
        this.percentHelper = this.percentHelper.bind(this);
        this.ajaxHelper = this.ajaxHelper.bind(this);
    }

    componentDidMount () {
        this.ajaxHelper();
        this.intervalId = setInterval(this.ajaxHelper, 10000);
        
    }

    ajaxHelper () {
        fetchCompanies()
            .then(companies => {
                
                this.companies = companies;
                let tickers = companies.map(comp => {
                    return comp.ticker
                });
                return getMultipleStockData(tickers.join(','), '1d');
            }).then(data => {
          
                this.prices = data
                return fetchTransactions();
            }).then(transactions => {
           
                this.numShares = this.transactionHelper(transactions);
                this.setState({ numShares: this.numShares, companies: this.companies, prices: this.prices });
        });
    }

    componentWillUnmount () {
        clearInterval(this.intervalId);
    }

    transactionHelper (transactions) {
        let sharesObj = {};
        transactions.forEach(trans => {
            if (sharesObj[trans.company_id] === undefined) {
                sharesObj[trans.company_id] = [{
                    transaction_type: trans.transaction_type,
                    shares: trans.shares
                }]
            } else {
                sharesObj[trans.company_id].push({
                    transaction_type: trans.transaction_type,
                    shares: trans.shares
                })
            }
        });
        let numShares = {};
        Object.keys(sharesObj).forEach(id => {
            numShares[id] = 0;
            sharesObj[id].forEach(trans => {
              
                if (trans.transaction_type === 'buy') {
                    numShares[id] += trans.shares
                } else {
                    numShares[id] -= trans.shares
                }
            })
        });
        return numShares;
    }

    priceHelper (prices) {
        let arr = prices.filter((ele) => ele.close);
        let output = arr[arr.length - 1].close;
        debugger;
        return (
            <p id='price'>
                {`$${output.toFixed(2)}`}
            </p>
        )
    }

    percentHelper (prices) {
        let arr = prices.filter((ele) => ele.close);
        let last = arr[arr.length - 1].close;
        let first = arr[0].close
        let difference = (last - first) / first * 100
        debugger;
        let percent = difference.toFixed(2);
        return (
            <p id={percent >= 0 ? 'percent-green' : 'percent-red'}>
                {percent + '%'}
            </p>
        )
    }

    renderStocks () {
        if (this.state.companies.length === 0 || Object.keys(this.state.prices).length === 0 || this.state.numShares.length === 0) {
            
            return ''
        } else {
           
            let companies = this.state.companies;
            let prices = this.state.prices;
            let shares = this.state.numShares;
            let stocks = Object.keys(companies).map((id, idx) => {
                let companyId = companies[id].id;
                let ticker = companies[id].ticker;
                debugger;
                return (<li className='stock-li' key={idx}>
                    <Link to={`/stocks/${ticker}`}>
                        <div className='shares-ticker-div'>
                            <p className='ticker'>
                                {companies[id].ticker.toUpperCase()}
                            </p>
                            <p className='shares'>
                                {shares[companyId]} Shares
                            </p>
                        </div>
                        <div className='graph-percent-price-div'>
                            {this.percentHelper(prices[ticker.toUpperCase()].chart)}
                            {this.priceHelper(prices[ticker.toUpperCase()].chart)}
                        </div>
                    </Link>
                </li>)
            })
            return (
                <ul className='stock-index-ul'>
                    {stocks}
                </ul>
            )
        }
        
    }

    render () {
        return (
            <div className='stock-index-div'>
                <h1>Stocks</h1>
                {this.renderStocks()}
            </div>
        );
    }
}

export default StockIndex;