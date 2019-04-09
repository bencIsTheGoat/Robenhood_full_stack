import React from 'react';
import { fetchCompanies } from '../../util/company_api_util';
import {withRouter, Redirect} from 'react-router-dom';


class Auto extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
            companies: []
        }
        this.selectStock= this.selectStock.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput (e) {
        this.setState({inputVal: e.target.value})
    }

    componentDidMount () {
        fetchCompanies().then(data => this.setState({companies: data}));
    }

    handleInput(e) {
        this.setState({inputVal: e.currentTarget.value});
    }

    matches() {
        const matches = [];
        if (this.state.inputVal.length === 0) {
            return null;
        }
        
        if (this.state.companies) {

            this.state.companies.forEach(stock => {
                let nameSearch = stock.name.toLowerCase().slice(0, this.state.inputVal.length) === this.state.inputVal.toLowerCase()
                if (nameSearch) {
                    matches.push([stock.ticker, stock.name]);
                }
            })
            if (matches.length === 0) {
                matches.push("No matches");
            }
            return matches.slice(0, 5);
        }
    }

    selectStock (e) {
        let stock = e.target.innerText;
        let ticker = stock.split(' ')[0];
        this.setState({ inputVal: '' });
        this.props.history.push(`/stocks/${ticker}`);
    }

    render () {
        if (this.state.companies.length === 0) {
            return ''
        } else {
            let stocks = (this.matches()) ? (
                this.matches().map((stock, i) => {
                    return (
                        <li key={i} onClick={this.selectStock} id='search-li'>
                            {stock[0]} {stock[1]}
                        </li>
                    );
                })
            ) : ""
            return (
            <div className='search'>
                <input 
                    id='search-input'
                    type="text"
                    onChange={this.handleInput}
                    value={this.state.inputVal}
                    placeHolder="Search Company Name"/>
                    <ul id='search-ul'>
                    {stocks}
                </ul>
            </div>
            ) 
        }
    }
}

export default withRouter(Auto);