import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatConversation from './ChatConversation';

class App extends Component {
    stage = 0;
    sizes = ['small', 'medium', 'large'];
    toppings = ['pepperoni', 'hawaiian', 'meat feast', 'margarita'];
    no = ['no', 'na', 'nah', 'nope'];
    yes = ['yes', 'yea', 'yeh', 'yeah', 'yep'];

    constructor() {
        super();
        this.state = {
            conversation: [
                { sender: 'bot', message: 'Hello can I take your order please?'}             
            ],
            pizzas: []
        };
        this.stage += 1;

        this.saveMessage = this.saveMessage.bind(this);
        this.respondFromBot = this.respondFromBot.bind(this);
        this.respondThanksFromBot = this.respondThanksFromBot.bind(this);
        this.parseRegex = this.parseRegex.bind(this);
    }
    
    parseRegex(message) {
        var response = {
            understood: false,
            done: false,
            pizza: null
        };

        if (new RegExp(this.toppings.join("|")).test(message)) {
            response.pizza = {}
            // Has given pizza order
            // Getsize
            var size = RegExp(this.sizes.join("|")).exec(message);

            if (size) {
                response.pizza.size = size[0];
            }

            var toppings = RegExp(this.toppings.join("|")).exec(message);

            if (toppings) {
                response.pizza.toppings = toppings.join(', ');
            }

            response.understood = true;
        
            
        } else if (new RegExp(this.no.join('|')).test(message)) {
            // Done ordering
            response.understood = true;
            response.done = true;
        } else if (new RegExp(this.yes.join('|')).test(message)) {
            // Wants to order another pizza
            response.understood = true;
        } else {
            response.understood = false;
        }

        return response;  
    }

    saveMessage(message) { 
        this.setState((state) => ({
            conversation: state.conversation.concat({
                sender: 'customer',
                message: message
            }) 
        }));

     
        if (this.stage === 1) {
            var response = this.parseRegex(message);

            if (response.understood && response.pizza) {
                this.setState({
                    pizzas: this.state.pizzas.concat({
                        toppings: response.pizza.toppings,
                        size: response.pizza.size
                    })
                })
            }

            if (response.done) {
                this.stage = 2;
                setTimeout(this.respondThanksFromBot, 1000);
            } else { 
                setTimeout(this.respondFromBot.bind(null, response.understood, response.pizza), 1000);
            }
        } else if (this.stage == 2) {
            setTimeout(() => {
                var pizzas = this.state.pizzas.map(p => p.size + ' ' + p.toppings).join(', ');
                this.stage = 3;
                this.setState(state => ({
                    conversation: state.conversation.concat({
                        sender: 'bot',
                        message: `Ok, so your order is a ${pizzas}. It\'ll be around 30 minutes. Thanks for your custom. Goodbye!`    
                    })
                }));
            }, 1000);
        }
    }

    respondThanksFromBot() {
          this.setState((state) => ({
            conversation: state.conversation.concat({
                sender: 'bot',
                message: 'And what\'s the delivery address?'
            }) 
        }));

        this.staging++;
        
    }

    respondFromBot(success, pizza) {
            if (pizza) {
                var order = `${pizza.size} ${pizza.toppings}`
            }
            var message = success ? `Ok, got a ${order}. Anything else?` : 'Sorry I didn\'t get that';

            this.setState((state) => ({
                conversation: state.conversation.concat({
                    sender: 'bot',
                    message: message
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
