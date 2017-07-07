import React, { Component } from 'react';

class CustomerMessage extends Component {
    render() {
        return (
            <div className="customer">
                <img src="images/customer_avatar.png" alt="avatar" className="avatar" />
                <div className="message">
                    {this.props.message}
                </div>               
            </div>
        );
    }
}

export default CustomerMessage;