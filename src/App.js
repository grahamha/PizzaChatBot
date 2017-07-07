import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatConversation from './ChatConversation';

class App extends Component {
    constructor() {
        super();
        this.state = {
            conversation: [
                { sender: 'bot', message: 'Hello can I take your order please?'}             
            ]
        };

        this.saveMessage = this.saveMessage.bind(this);
        this.respondFromBot = this.respondFromBot.bind(this);
    }
    
    saveMessage(message) {    
        this.setState((state) => ({
            conversation: state.conversation.concat({
                sender: 'customer',
                message: message
            }) 
        }));

        setTimeout(this.respondFromBot, 1000);
    }

    respondFromBot() {
        this.setState((state) => ({
            conversation: state.conversation.concat({
                sender: 'bot',
                message: 'Hello again'
            }) 
        }));
    }
    
    render() {
        return (
            <div className="chat-window">
                <ChatConversation conversation={this.state.conversation} />
                <ChatInput saveMessage={this.saveMessage} />
            </div>
        );
    }
}

export default App;
