import { connect } from 'react-redux';
import StockShow from './stock_show';

const msp = (state, ownProps) => {
    return {ticker: ownProps.match.params.ticker}
}

export default connect(msp, null)(StockShow);

