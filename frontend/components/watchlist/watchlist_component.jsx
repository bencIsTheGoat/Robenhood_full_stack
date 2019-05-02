import React from 'react';
import { getMultipleLastPrice } from '../../util/company_api_util';
import { Link } from 'react-router-dom';


class Watchlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {companies: this.props.items, prices: []};
        this.renderWatchlist = this.renderWatchlist.bind(this);
        this.priceHelper = this.priceHelper.bind(this);
        this.percentHelper = this.percentHelper.bind(this);
        this.moneyFormat = this.moneyFormat.bind(this);
        this.uniqueCompanies = this.uniqueCompanies.bind(this);
    }

    formatCompanies () {
        const array = Object.values(this.state.companies).map(ele => {
            return ele.ticker.toLowerCase();
        });
        return array.join(',');
    }
    
    componentDidMount () {
        this.props.fetchWatchlistIndex().then(() => {
            this.setState({companies: this.props.items})
            getMultipleLastPrice(this.formatCompanies()).then(data => {
                this.setState({ prices: data })
            });
        })
    }

    priceHelper(price) {
        return (
            <p id='price'>
                {`${this.moneyFormat(price)}`}
            </p>
        )
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

    percentHelper(percent) {
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

    uniqueCompanies(companies) {
        let companiesObj = {};
        Object.values(companies).forEach(comp => {
            if (companiesObj[comp.ticker] === undefined) {
                companiesObj[comp.ticker] = comp
            }
        });
        return companiesObj;
    }

    renderWatchlist () {
        let prices;
        const comps = this.uniqueCompanies(this.state.companies);
        const lis = Object.values(comps).map((ele, idx) => {
            prices = this.state.prices;
            return(<li className='stock-li' key={idx}>
                <Link to={`/stocks/${ele.ticker}`}>
                    <div className='shares-ticker-div'>
                        <p className='ticker'>
                            {ele.ticker.toUpperCase()}
                        </p>
                    </div>
                    <div className='graph-percent-price-div'>
                        {this.percentHelper(prices[ele.ticker.toUpperCase()].quote.changePercent)}
                        {this.priceHelper(prices[ele.ticker.toUpperCase()].quote.latestPrice)}
                    </div>
                </Link>
            </li>)
        })
        return (
            <ul className='stock-index-ul'>
                {lis}
            </ul>
        )
    }

    render () {
        if (this.state.prices.length === 0) {
            return '';
        } else {
            return (
                <div className='watchlist-div'>
                    <h1>Watchlist</h1>
                    {this.renderWatchlist()}
                </div>
            );
        }
    }
}

export default Watchlist;