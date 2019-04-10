import React from 'react';
import { getStockData } from '../../util/company_api_util';
import { fetchCompanies, getMultipleStockData } from '../../util/company_api_util';
import { fetchTransactions } from '../../util/transaction_api_util';
import { withRouter} from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis, Tooltip} from 'recharts';


class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            numShares: [],
            prices: []
        }
        this.formatPortData = this.formatPortData.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.ajaxHelper = this.ajaxHelper.bind(this);
        this.portValueTable = this.portValueTable.bind(this);
        this.priceHelper = this.priceHelper.bind(this);
        this.nameFormatter = this.nameFormatter.bind(this);
    }

    componentDidMount () {
        this.ajaxHelper();
        this.interval = setInterval(() => this.ajaxHelper(), 10000)
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
                return getMultipleStockData(this.formatTickers(), '1d').then(data => {
                    this.setState({ prices: data })
                })
            })
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    userCompanies(companies) {
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

    transactionHelper(transactions) {
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

    tickerToId() {
        let companies = {}
        this.state;
        Object.keys(this.state.companies).forEach(ticker => {
            companies[this.state.companies[ticker]] = ticker;
        });
        return companies;
    }

    priceHelper(prices) {
        let arr = prices.filter((ele) => ele.close);
        return arr[arr.length - 1].close;
    }

    portValueTable () {
        let numShares = this.state.numShares;
        let prices = this.state.prices;
        let tickerObj = this.tickerToId();
        let trs = Object.keys(this.state.numShares).map(id => {
            let price = this.priceHelper(prices[tickerObj[id]].chart);
            let ticker = tickerObj[id];
            return (
                <tr>
                    <td id='table-ticker'>
                        {ticker}
                    </td>
                    <td>
                        {numShares[id]}
                    </td>
                    <td>
                        ${new Intl.NumberFormat('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(price)}
                    </td>
                    <td>
                        ${new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numShares[id] * price)}
                    </td>

                </tr>
            );
        });
        let rows = (
            <tr>
                <td id='table-header'>
                    Ticker
                </td>
                <td id='table-header'>
                    Shares
                </td>
                <td id='table-header'>
                    Current Price
                </td>
                <td id='table-header'>
                    Equity
                </td>
            </tr>
        )
        trs.unshift(rows)
        return (
            <table>
                {trs}
            </table>
        );
    }


    formatPortData () {
        this.max = 0;
        let total = 0;
        let tickerObj = this.tickerToId();
        let prices = this.state.prices;
        let numShares = this.state.numShares;
        Object.keys(this.state.numShares).forEach(id => {
            let price = this.priceHelper(prices[tickerObj[id]].chart);
            let next = numShares[id] * price;
            total += next;
            if (next > this.max) {
                this.max = next;
            } 
        })
        return Object.keys(this.state.numShares).map(id => {
            let price = this.priceHelper(prices[tickerObj[id]].chart)
            let percent = ((numShares[id] * price) / total * 100).toFixed(2);
            return { 
                subject: tickerObj[id] + " " + percent + "%",
                value: (numShares[id] * price) / total,
                fullMark: this.max}
        })
    }

    nameFormatter () {
        let first = this.props.users[this.props.userId].first_name;
        let last = this.props.users[this.props.userId].last_name;
        first = first[0].toUpperCase() + first.slice(1, first.length).toLowerCase();
        last = last[0].toUpperCase() + last.slice(1, last.length).toLowerCase();
        return (
            <h2 id='info-text'>
                {first + ' ' + last + "'s Portfolio Information"}
            </h2>
        )
    }

    render () {
        if (this.state.companies.length === 0 || this.state.prices.length === 0 || this.state.numShares.length === 0) {
            return ''
        } else {
            return (
                <div className='account-render-div'>
                    <div className='account-header'> 
                        <h2 className='robenhood-h2' onClick={this.handleHome}>
                            <i className="fas fa-feather-alt"></i>
                            robenhood
                        </h2>
                        <button onClick={this.handleLogout} id='logout-button'>
                            Logout
                        </button>

                    </div>
                    <div className='chart-table-div'>
                        <div className='user-info'>
                            {this.nameFormatter()}
                        </div>
                        <div className='port-chart-div'>
                            <RadarChart outerRadius={180} width={730} height={400} data={this.formatPortData()}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                {/* <PolarRadiusAxis angle={30} domain={[0, 100%]} /> */}
                                <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Legend formatter={value => 'Portfolio Diversity (%)'} />
                                <Tooltip />
                            </RadarChart>
                        </div>
                        <div className='user-info'>
                            <h2 id='info-text'>
                                Stocks
                            </h2>
                        </div>
                        <div className='port-table-div'>
                            {this.portValueTable()} 
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push('/'))
    }

    handleHome(e) {
        debugger;
        e.preventDefault();
        this.props.history.push('/home');
    }
}

export default withRouter(Account);