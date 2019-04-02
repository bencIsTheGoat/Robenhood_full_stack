import React from 'react';
import GraphContainer from './graph_container';
import NewsContainer from './news_container';
import StockIndexContainer from './stock_index_container'

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='home-page-div'>
                <GraphContainer />
                <NewsContainer />
                <StockIndexContainer />
            </div>
        )
    }

}

export default HomePage;