import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import AlertMessage from './AlertMessage/AlertMessage';

import classes from './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nick : null,
            password : null,
            errorMessage : null,
        }

        this.btnRef = React.createRef();
        this.nickRef = React.createRef();
        this.loginClick = this.loginClick.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        this.nickRef.current.focus();
    }

    inputChange(e, inputType) {
        let state = {
            ...this.state
        }
        state[inputType] = e.target.value;
        //console.log(e.target.value);
        this.setState(state);
    }

    register(id) {
        if (!this.state.nick || this.state.nick.length < 4) {
            this.setState({
                errorMessage: 'Nick must contains atleast 4 symbols'
            });
            return false;
        }
        if (!this.state.password || this.state.password.length < 4) {
            this.setState({
                errorMessage: 'Password length must be > 4'
            });
            return false;
        }
        let user = {
            nick: this.state.nick,
            password: this.state.password,
            userId: id
        }
        axios.post('/users.json', user);
        return true;
    }

    loginClick(e) {
        if (e.type=='keydown' && e.keyCode !== 13) return;
        e.preventDefault();
        axios.get('/users.json')
            .then(response => {
                let data = response.data;
                if (data) {
                    let dataKeys = Object.keys(data);
                    let nicknames = dataKeys.map(e=>data[e].nick);
                    let nickIndex = nicknames.indexOf(this.state.nick);

                    if (nickIndex != -1) {
                        if (this.state.password != data[dataKeys[nickIndex]].password) {
                            this.setState({
                                errorMessage: 'Wrong password'
                            })
                            return;
                        }
                    } else {
                        if( !this.register(dataKeys.length) ) return;
                    }
                } else {
                    if ( !this.register(0) ) return;
                }
                this.props.onLogin(this.state.nick);
            })
    }
    
    render() {
        // const msgWrong = (
        //     <div className = {[classes.MessageWrong, classes.TextWrapper]}>
        //         <span>Wrong password</span>
        //     </div>
        // );
        if (this.props.auth)
            return <Redirect to="/" />

        return (
            <div className = {classes.LoginWrap}>
                <div className = {classes.Login}>  
                    <AlertMessage position={{left: '90px', top: '60px'}}> 
                        If user is not exist, it will be created 
                    </AlertMessage>

                    <div className = {classes.Wrap}>
                        <form>
                            <input 
                                onChange={(e)=>this.inputChange(e, 'nick')} 
                                type="text"
                                placeholder="Login" 
                                onKeyDown={this.loginClick}
                                ref = {this.nickRef}
                                tabIndex="1"
                                maxLength="12"
                            />
                            <input 
                                onChange={(e)=>this.inputChange(e, 'password')} 
                                type="password" 
                                placeholder="Password" 
                                onKeyDown={this.loginClick}
                                tabIndex="2"
                                maxLength="20"
                            />
                            <input 
                                ref = {this.btnRef} 
                                className = {classes.BtnSubmit} 
                                type="button" 
                                value = "Login"
                                onClick={this.loginClick}
                            />
                        </form>
                    </div>
                    {this.state.errorMessage ? 
                        <AlertMessage position={{left: '90px', bottom: '40px'}}> 
                            {this.state.errorMessage} 
                        </AlertMessage> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (nick) => dispatch({type: 'LOG_IN', nick: nick})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
