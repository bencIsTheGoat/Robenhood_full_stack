import React from 'react';
import { getStockData } from '../../util/company_api_util';
import { fetchCompanies, getMultipleLastPrice } from '../../util/company_api_util';
import { fetchTransactions } from '../../util/transaction_api_util';
import { Link } from 'react-router-dom';
import WatchlistContainer from '../watchlist/watchlist_container';

class StockIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            numShares: [],
            prices: []}
        this.renderStocks = this.renderStocks.bind(this);
        this.priceHelper = this.priceHelper.bind(this);
        this.percentHelper = this.percentHelper.bind(this);
        this.ajaxHelper = this.ajaxHelper.bind(this);
        this.moneyFormat = this.moneyFormat.bind(this);
    }

    componentDidMount () {
        this.props.startLoad();
        this.ajaxHelper();
        this.intervalId = setInterval(this.ajaxHelper, 10000);
        
    }
    
    ajaxHelper() {
        fetchTransactions()
        .then((transactions) => {
            this.numShares = this.transactionHelper(transactions) 
            this.setState({ transactions: transactions, numShares: this.numShares })
        })
        .then(() => fetchCompanies().then(companies => {
            this.setState({ companies: this.userCompanies(companies) })
        }))
        .then(() => {
            return getMultipleLastPrice(this.formatTickers()).then(data => {
                this.setState({ prices: data })
                this.props.stopLoad();
            })
            })
            this.setState();

    }

    dateAjaxHelper () {
        let date = new Date ();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        if (date.getDay() === 6) day -= 1;
        if (date.getDay() === 7) day -= 2;
        if (date.getMonth < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        return `${date.getFullYear()}${month}${day}`
    }

    userCompanies (companies) {
        let companiesObj = {};
        this.state.transactions.forEach(trans => {
            for (let i = 0; i < companies.length - 1; i++) {
                if (companies[i].id === trans.company_id) {
                    companiesObj[companies[i].ticker] = trans.company_id;
                }
            }
        })
        return companiesObj
    }

    formatTickers() {
        let companiesObj = {};
        this.state.transactions.forEach(trans => {

            let companies = this.state.companies;

            for (let i = 0; i < Object.keys(companies).length; i++) {

                if (companies[Object.keys(companies)[i]] === trans.company_id) {
                    companiesObj[Object.keys(companies)[i]] = trans.company_id;
                }
            }
        })

        let tickers = Object.keys(companiesObj).map(ticker => {
            return ticker.toLowerCase();
        })

        return tickers.join(',')

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

    priceHelper (price) { 
        return (
            <p id='price'>
                {`${this.moneyFormat(price)}`}
            </p>
        )
    }

    percentHelper (percent) {
        let difference = percent * 100
        percent = difference.toFixed(2);
        if (percent === undefined) {
            return "0.00%"
        } else {
            return (
                <p id={percent >= 0 ? 'percent-green' : 'percent-red'}>
                    {percent + '%'}
                </p>
            )
        }
        
    }

    uniqueCompanies (companies) {
        this.state;
   
        let companiesObj = {};
        Object.keys(companies).forEach(comp => {
            if (this.state.numShares[companies[comp]] !== 0) {
                companiesObj[comp] = 1
            }
        });
        return companiesObj;
    }

    moneyFormat(num) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatter.format(num);
    }


    renderStocks () {
        if (this.state.companies.length === 0 || this.state.prices.length === 0 || this.state.numShares.length === 0) {
            return ''
        } else {
            let companies = this.state.companies;
            let prices = this.state.prices;
            let shares = this.state.numShares;
            
            let stocks = Object.keys(this.uniqueCompanies(this.state.companies)).map((id, idx) => {
                let ticker = id;
                return (<li className='stock-li' key={idx}>
                    <Link to={`/stocks/${ticker}`}>
                        <div className='shares-ticker-div'>
                            <p className='ticker'>
                                {id}
                            </p>
                            <p className='shares'>
                                {Math.abs(shares[companies[id]])} Shares
                            </p>
                        </div>
                        <div className='graph-percent-price-div'>
                            {this.percentHelper(prices[id.toUpperCase()].quote.changePercent)}
                            {this.priceHelper(prices[id.toUpperCase()].quote.latestPrice)}
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
                <WatchlistContainer />
            </div>
        );
    }
}

export default StockIndex;