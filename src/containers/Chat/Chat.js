import React, { Component } from 'react';
import axios from '../../axios-orders';
import {Redirect} from 'react-router-dom';

import ChatWindow from '../../components/ChatWindow/ChatWindow';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
//import MessageWindow from '../../components/MessageWindow/MessageWindow';
import classes from './Chat.css'; 
import Online from '../Online/Online';
import Logout from '../../components/Logout/Logout';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        }

        this.sendMessage = this.sendMessage.bind(this);
    }
    
    sendMessage(obj) {
        let data = this.state.data.slice();
        data.push(obj);

        this.setState({
            data : data,
        });
    }

    componentDidMount() {
        console.log(this.props.auth)
        if (!this.props.auth) return;
        axios.get('/messages.json')
            .then(response => {
                console.log(response);
                let arr = Object.values(response.data);
                let newArr = arr.map(e=>{
                    return {
                        ...e,
                    }
                });
                if (this.state.data.length !== newArr.length)
                    this.setState({
                        data : newArr,
                    })
            })
    }

    render() {
        if (!this.props.auth)
            return <Redirect to="/login" />
        return (
            <React.Fragment>
                <div className = {classes.Chat}>
                    <Online />
                    <ChatHeader />
                    <ChatWindow user = {this.props.nick} data = {this.state.data} send={this.sendMessage} />
                </div>
                <Logout clicked={this.props.onLogout} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        nick: state.nick
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: 'LOG_OUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
