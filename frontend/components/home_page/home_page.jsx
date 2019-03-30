import React from 'react';
import GraphContainer from './graph_container';

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='home-page-div'>
                <GraphContainer />
            </div>
        )
    }

}

export default HomePage;