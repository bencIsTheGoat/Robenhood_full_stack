import React from 'react';
import { fetchTransactions } from '../../util/transaction_api_util';
import { fetchCompanies } from '../../util/company_api_util';
import { getCompanyInfo } from '../../util/company_api_util';
import { Redirect } from 'react-router-dom';

class Form extends React.Component {

    constructor(props) {
        super(props);
        let last = this.props.props.oneDay;
        let price = last[last.length - 1].close
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
    }

    componentDidMount () {
            fetchTransactions().then(trans => {
                return this.setState({ numShares: this.transactionHelper(trans) });
            });
            fetchCompanies().then(companies => {
                return this.setState({ companies: companies })
            });
    
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

    costHelper () {
        return (e) => {
            e.preventDefault();
            this.setState({input: e.target.value});
            let value = parseInt(e.target.value);
            if (String(value) === "NaN") {
                this.setState({cost: 0})
            } else {
                let cost = value * this.state.currentPrice;
                this.setState({cost: cost.toFixed(2)});
            }
        }
    }

    renderForm () {
        let costCredit;
        if (this.state.buy) {
            costCredit = "Cost";
        } else {
            costCredit = "Credit";
        }

        return (
            <div className='form-div-trans'>
                <div className='buy-sell-div'>
                    <button className='buy' onClick={this.handleToggle}>
                        Buy {this.state.ticker.toUpperCase()}
                    </button>
                    <button className='sell' onClick={this.handleToggle}>
                        Sell {this.state.ticker.toUpperCase()}
                    </button>
                </div>
                <div className='form-info-div'>
                    <div className='indi-form-info'>
                        <label>Shares</label>
                        <input id='input-shares' type="text" value={this.state.input} onChange={this.costHelper()}/>
                    </div>
                    <div className='indi-form-info'>
                        <label>Market Price</label>
                        <p>${this.state.currentPrice}</p>
                    </div>
                    <div className='indi-form-info'>
                        <label>Estimated {costCredit}</label>
                        <p>{this.state.cost}</p>
                    </div>
                    <button onClick={this.handleReview}>
                        Review Order
                    </button>
                    <p>
                        {this.sharesHelper()} Shares Available
                    </p>
                </div>
            </div>

        )
    }

    tickerToId(ticker) {
        let obj = {};
        this.state.companies.forEach(comp => {
            obj[comp.ticker] = comp.id;
        });
        return obj[ticker];
    }

    sharesHelper() {
        let id = this.tickerToId(this.state.ticker);
        return this.state.numShares[id];
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState({buy: !this.state.buy});
    }

    nameHelper (ticker) {
        let obj = {};
        this.state.companies.forEach(comp => {
            obj[comp.ticker] = comp.name;
        });
        return obj[ticker];
    }

    handleReview(e) {
        e.preventDefault();
        let trans = this.state.buy ? 'buy' : 'sell';
        this.tickerToId(this.state.ticker)
        let transactionInfo = {
            company_id: this.tickerToId(this.state.ticker),
            transaction_type: trans,
            price: this.state.currentPrice,
            shares: this.state.input};
        this.props.createTransaction(transactionInfo)
    
    }

    render () {
        if (this.state.companies.length === 0 || this.state.numShares === 0) {
            return '';
        } else {
            return (
                this.renderForm()
            );
        }
            
        
    }


}

export default Form;