import React from 'react';
import GraphContainer from './graph_container';
import NewsContainer from './news_container';

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='home-page-div'>
                <GraphContainer />
                <NewsContainer />
            </div>
        )
    }

}

export default HomePage;