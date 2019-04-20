import React from 'react';

class loadingAnimation extends React.Component {

    render () {
        if (this.props.loading === true) {
            return (
                <div className='loading-div'>
                    <img src={window.moneyGif} />
                </div>
            )
        } else {
            return (
               ''
            )
        }
    }
}

export default loadingAnimation;