import React, { Component } from 'react';

class ChatInput extends Component {
    constructor() {
        super();
        this.saveMessage = this.saveMessage.bind(this);
    }
 
    saveMessage(e) { 
        e.preventDefault();
        this.props.saveMessage(this.refs.input.value);

        // Clear textbox
        this.refs.input.value = ''; 
    }

    render() {
        return (
            <div className="chat-input">
                <form>
                    <input type="text" className="input" placeholder="Type your message" ref="input" />
                    <button type="submit" className="send" onClick={this.saveMessage}>
                        <img src="images/ico_send.png" alt="send" />
                    </button>
                </form>
            </div>
        );
    }
}

export default ChatInput;