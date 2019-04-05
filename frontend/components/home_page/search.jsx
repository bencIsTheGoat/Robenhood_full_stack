import React from 'react';
import { fetchCompanies } from '../../util/company_api_util';
import {withRouter} from 'react-router-dom';


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
                if ((stock.ticker.includes(this.state.inputVal.toUpperCase())) || 
                (stock.name.toUpperCase().includes(this.state.inputVal.toUpperCase()))) {
                    matches.push(stock.ticker);
                }
            });
            if (matches.length === 0) {
                matches.push("Breh, no matches");
            }
            return matches.slice(0, 7);
        }
    }

    selectStock (e) {
        let stock = e.target.innerText;
        if (this.props.match.url.includes('home')) {
            this.setState({ inputVal: ''});
            this.props.history.push(`/stocks/${stock}`)
        } else {
            this.setState({ inputVal: '' });
            this.props.history.push(`/stocks/${stock}`)
        }
    }

    render () {
        if (this.state.companies.length === 0) {
            return ''
        } else {
            let stocks = (this.matches()) ? (
                this.matches().map((stock, i) => {
                    return (
                        <li key={i} onClick={this.selectStock} id='search-li'>
                            {stock}
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
                    placeHolder="Search Stock"/>
                <ul className='search-ul'>
                    {stocks}
                </ul>
            </div>
            ) 
        }
    }
}

export default withRouter(Auto);