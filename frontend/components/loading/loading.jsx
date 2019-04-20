import React from 'react';

class loadingAnimation extends React.Component {

    render () {
        if (this.props.loading === true) {
            return (
                <div className='loading-div'>
                    LOADING
                </div>
            )
        } else {
            return (
                <div className='loading-div'>
                    NOT LOADING
                </div>
            )
        }
    }
}

export default loadingAnimation;