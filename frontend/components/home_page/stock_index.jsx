import React from 'react';
import { getStockData } from '../../util/company_api_util';
import { fetchCompanies } from '../../util/company_api_util';

class StockIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: this.props.companies,
            shares: this.props.shares,
            prices: this.props.prices}
        this.renderStocks = this.renderStocks.bind(this);
    }

    componentDidMount () {
        fetchCompanies()
        .then(companies => {
            debugger;
            for (let i = 0; i < companies.length; i++) {
                debugger;
                let ticker = companies[i].ticker;
                return getStockData(ticker, '1d');
            }
        }).then(data => {
            debugger;
            this.setState({prices: data, companies: this.state.companies, shares: this.state.shares})
        })
    }

    renderStocks () {
        if (this.props.companies.length === 0 && this.props.prices !== {}) {
            return 'test'
        } else {
            return (
                <div className='company-info'>
                   {Object.keys(this.state.prices)}
                </div>
            )
        }
        
    }

    render () {
        return (
                this.renderStocks()
        );
    }
}

export default StockIndex;