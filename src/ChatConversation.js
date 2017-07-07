import React, { Component } from 'react';
import BotMessage from './BotMessage';
import CustomerMessage from './CustomerMessage';

class ChatConversation extends Component {
    componentDidUpdate() {
        var scrollNode = document.getElementsByClassName('chat-conversation')[0];
        scrollNode.scrollTop = scrollNode.scrollHeight;
    }

    render() {
        return (
            <div className="chat-conversation">
                {
                    this.props.conversation.map((c, i) => {
                        if (c.sender === 'bot') {
                            return <BotMessage key={i} message={c.message} />
                        } else if (c.sender === 'customer') {
                            return <CustomerMessage key={i} message={c.message} />
                        }

                        return '';
                    })
                }
            </div>
        );
    }
}

export default ChatConversation;