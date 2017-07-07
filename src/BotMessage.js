import React, { Component } from 'react';

class BotMessage extends Component {
    render() {
        return (
            <div className="bot">
                <img src="images/bot_avatar.png" alt="avatar" className="avatar" />
                <div className="message">
                    {this.props.message}
                </div>
            </div>
        );
    }
}

export default BotMessage;