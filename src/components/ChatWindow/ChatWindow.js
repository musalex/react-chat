import React, {Component} from 'react';

import classes from './ChatWindow.css';
import Message from '../Message/Message';
import MessageWindow from '../MessageWindow/MessageWindow';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolled : false,
        }

        this.chatRef = React.createRef();
        this.mesRef = React.createRef();

        this.scrollChat = this.scrollChat.bind(this);
        this.conditionalScroll = this.conditionalScroll.bind(this);
        this.sendHandler = this.sendHandler.bind(this);
    }

    
    componentDidUpdate() {
        if (!this.state.isScrolled) {
            this.scrollChat();
            this.setState({
                isScrolled : true
            })
        }
        this.conditionalScroll();
    }

    scrollChat() {
        this.chatRef.current.scrollTo(0, this.mesRef.current.offsetHeight)
    }

    sendHandler(obj) {
        this.props.send(obj);
    }

    conditionalScroll() {
        let chat = this.chatRef.current;
        if (chat.scrollHeight - chat.scrollTop -  11 < 2 * chat.offsetHeight)
            this.scrollChat();
    }

    render() { 
        return (
            <React.Fragment>
                <div className = {classes.ChatWindow} ref = {this.chatRef}>
                    <div ref = {this.mesRef}>
                        {this.props.data.map((e,i)=>{
                            const sentType = this.props.user === e.user ? 'sentMsg' : 'getMsg';
                            return (
                                <Message 
                                    text = {e.text} 
                                    key = {i} 
                                    sentType = {sentType} 
                                    time = {e.time}
                                    nickName = {e.user}
                                />)
                        })}
                    </div>
                </div>
                <MessageWindow user = {this.props.user} send={this.sendHandler} />
            </React.Fragment>
        )
    }
};

export default ChatWindow;
