import React from 'react';

class TopInfoComponent extends React.Component {

    render () {
        return (
            <div className='top-info-div'>
                {Object.values(this.props.data)}
            </div>
        )
    }

}

export default TopInfoComponent;