import React from 'react';
import { fetchTransactions } from '../../util/transaction_api_util';
import { fetchCompanies } from '../../util/company_api_util';
import { getStockData } from '../../util/company_api_util';
import { withRouter } from 'react-router-dom';

class Form extends React.Component {

    constructor(props) {
        super(props);
        const last = this.props.props.oneDay;
        let price = '';
        if (last.length > 0) price = last[last.length - 1].close
        this.state = {
            currentPrice: price,
            buy: true, 
            ticker: this.props.ticker.toUpperCase(),
            cost: 0,
            companies: [],
            numShares: []};
        this.sharesHelper = this.sharesHelper.bind(this);
        this.costHelper = this.costHelper.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.tickerToId = this.tickerToId.bind(this);
        this.moneyFormat = this.moneyFormat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sharesTextHelper = this.sharesTextHelper.bind(this);
    }

    componentDidMount () {
        // this.props.startLoad();
        fetchTransactions().then(trans => {
            return this.setState({ numShares: this.transactionHelper(trans) });
        });
        fetchCompanies().then(companies => {
            return this.setState({ companies: companies });
        });
    
    }

    componentWillUpdate (prevProps) {
       if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
           const propsTicker = prevProps.match.params.ticker.toLowerCase();
           getStockData(propsTicker, '1d')
           .then(data => {
               this.setState({ oneDay: data })
               const last = this.state.oneDay;
               const price = last[last.length - 1].close
               this.setState({
                   currentPrice: price,
                   buy: true,
                   ticker: prevProps.match.params.ticker,
                   cost: 0,
               });
           });
       }
    }

    transactionHelper(transactions) {
        const sharesObj = {};
        transactions.forEach(trans => {
            if (sharesObj[trans.company_id] === undefined) {
                sharesObj[trans.company_id] = [{
                    transaction_type: trans.transaction_type,
                    shares: trans.shares
                }];
            } else {
                sharesObj[trans.company_id].push({
                    transaction_type: trans.transaction_type,
                    shares: trans.shares
                });
            }
        });
        const numShares = {};
        Object.keys(sharesObj).forEach(id => {
            numShares[id] = 0;
            sharesObj[id].forEach(trans => {
                if (trans.transaction_type === 'buy') {
                    numShares[id] += trans.shares
                } else {
                    numShares[id] -= trans.shares
                }
            });
        });
        return numShares;
    }

    costHelper () {
        return (e) => {
            e.preventDefault();
            this.setState({input: e.target.value});
            let value = parseInt(e.target.value);
            if (String(value) === "NaN") {
                this.setState({cost: 0});
            } else {
                let cost = value * this.state.currentPrice;
                this.setState({cost: cost.toFixed(2)});
            }
        }
    }

    moneyFormat (num) {
        const time = new Date ();
        const hour = time.getHours();
        const mins = time.getMinutes();
        const format = hour + (mins / 60);
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        if (format > 16.5) {
            return 'Market Closed';
        } else if (num) {
            return formatter.format(num);
        } else {
            return formatter.format(0);
        }
    }



    renderForm () {
        let costCredit;
        let buySell;
        if (this.state.buy) {
            costCredit = "Cost";
            buySell = 'Buy';
        } else {
            costCredit = "Credit";
            buySell = 'Sell';
        }
        if (this.state.currentPrice === null) {
            return (
                <div className='form-div-trans'>
                    <p>Stock Unavaliable for Purchase on Robenhood Network</p>
                </div>
            );
        } else {
            return (
                <div className='form-div-trans'>
                    <div className='buy-sell-div'>
                        <button className='buy' onClick={this.handleToggle('buy')}>
                            Buy {this.state.ticker.toUpperCase()}
                        </button>
                        <button className='sell' onClick={this.handleToggle('sell')}>
                            Sell {this.state.ticker.toUpperCase()}
                        </button>
                    </div>
                    <div className='form-info-div'>
                        <div className='indi-form-info'>
                            <label>Shares</label>
                            <input id='input-shares' type="text" value={this.state.input} placeholder='0' onChange={this.costHelper()}/>
                        </div>
                        <div className='indi-form-info'>
                            <label>Market Price</label>
                            <p>{this.moneyFormat(this.state.currentPrice)}</p>
                        </div>
                        <div className='indi-form-info'>
                            <label>Estimated {costCredit}</label>
                            <p>{this.moneyFormat(this.state.cost)}</p>
                        </div>
                        <button onClick={this.handleReview} className='show'>
                            Review Order
                        </button>
                        <span id='hidden-text'>You are placing a good for day market order to {buySell} {this.state.input} share(s) of {this.state.ticker.toUpperCase()}. Your order will be executed at the best available price.</span>
                        <button onClick={this.handleSubmit} className='hidden' id='submit'>
                            Submit {buySell}
                        </button>
                        <div className='shares-div'>
                            {this.sharesTextHelper()}
                        </div>
                    </div>
                </div>
            );  
        }
    }

    sharesTextHelper () {
        const num = this.sharesHelper();
        if (num !== 0) {
            return(<p id='shares-avail'>
                {num} Shares Available
            </p>)
        } else {
            return(<p id='shares-avail'>
                No Shares Available
            </p>)
        }
    }

    handleReview (e) {
        e.preventDefault();
        e.currentTarget.className = 'hidden';
        document.getElementById('submit').className = 'show';
        document.getElementById('hidden-text').id = 'show-text';
    }

    tickerToId(ticker) {
        const obj = {};
        this.state.companies.forEach(comp => {
            obj[comp.ticker] = comp.id;
        });
        return obj[ticker];
    }

    sharesHelper() {
        const id = this.tickerToId(this.state.ticker);
        return this.state.numShares[id];
    }

    handleToggle(name) {
        return (e) => {
            e.preventDefault()
            if (name === 'buy') {
                this.setState({buy: true});
            } else {
                this.setState({buy: false})
            }
        }
    }

    nameHelper (ticker) {
        const obj = {};
        this.state.companies.forEach(comp => {
            obj[comp.ticker] = comp.name;
        });
        return obj[ticker];
    }

    handleSubmit(e) {
        e.preventDefault();
        const trans = this.state.buy ? 'buy' : 'sell';
        this.tickerToId(this.state.ticker);
        const transactionInfo = {
            company_id: this.tickerToId(this.state.ticker),
            transaction_type: trans,
            price: this.state.currentPrice,
            shares: this.state.input};
        this.props.createTransaction(transactionInfo).then(() => this.props.history.push('/home'));
    }

    render () {
        if (this.state.companies.length === 0 || this.state.numShares === 0) {
            return '';
        } else {
            this.props.stopLoad();
            return this.renderForm();
        }
    }

}

export default withRouter(Form);