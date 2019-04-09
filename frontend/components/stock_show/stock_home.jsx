import { withRouter } from 'react-router-dom';
import Auto from '../home_page/search';
import FormContainer from './form_container';
import StockShowContainer from './stock_container';
import React from 'react';

class StockHome extends React.Component {
    render () {
        return (
            <div>
                <Auto props={this.props.history.location}/>
                <StockShowContainer />
            </div>
        )
    }
}

export default withRouter(StockHome);
