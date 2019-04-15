import React from 'react';
import { getMultipleStockData } from '../../util/company_api_util';

class Watchlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {companies: this.props.items, prices: []}
    }

    // format state into csv of tickers for ajax
    // shoot off ajax for current prices in CWM
    // create helper render that maps and returns ul of info
    
    componentDidMount () {

    }

    render () {
        if (this.state.prices.length === 0) {
            return ''
        } else {
            return (
                <div className='watchlist-div'>
    
                </div>
            )
        }
    }
}

export default Watchlist;