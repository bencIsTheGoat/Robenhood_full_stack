import React from 'react';
import GraphContainer from './graph_container';
import NewsContainer from './news_container';
import StockIndexContainer from './stock_index_container';
import Auto from './search';

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div className='robenhood-header'>
                    <h2 className='robenhood-h2'>
                        <i className="fas fa-feather-alt"></i>
                        robenhood
                </h2>
                </div>
                <div className='home-page-div'>
                    <Auto />
                    <GraphContainer />
                    <NewsContainer />
                    <StockIndexContainer />
                </div>
            </div>
        )
    }

}

export default HomePage;