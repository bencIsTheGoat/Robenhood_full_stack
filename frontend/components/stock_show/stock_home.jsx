import { withRouter } from 'react-router-dom';
import Auto from '../home_page/search';
import StockShowContainer from './stock_container';
import React from 'react';
import {Link} from 'react-router-dom';


class StockHome extends React.Component {
    render () {
        return (
            <div className='stock-show'>
               
                    <div className='account'>
                        <Link to='/account'>
                            Account
                        </Link>
                    </div>
                    <button onClick={this.handleLogout} id='logout-button'>
                        Logout
                    </button>
    
                <Auto props={this.props.history.location}/>
                <StockShowContainer />
            </div>
        )
    }
}

export default withRouter(StockHome);
