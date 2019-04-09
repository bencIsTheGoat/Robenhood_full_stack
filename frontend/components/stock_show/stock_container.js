import { connect } from 'react-redux';
import StockShow from './stock_show';
import {withRouter} from 'react-router-dom';

const msp = (state, ownProps) => {
    return {ticker: ownProps.match.params.ticker}
}

export default withRouter(connect(msp, null)(StockShow));

