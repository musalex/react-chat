import React, { Component } from 'react';
import OnlineButton from '../../components/OnlineButton/OnlineButton';
import OnlineBody from '../../components/OnlineBody/OnlineBody';
//import classes from './Online.css';

class Online extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            show : false,
            text : '',
            users : ['Путин', 'asd', 'dayn', 'roborot', 'asdasdvvwewe', 'asdasdcmasdofmsdokfmoaskmdasmdamsdkmaskdaskmd', 'mood', 'kengoo', 'ggwp']
        }
        this.click = this.click.bind(this);
    }

    click() {
        this.setState((prevState)=>{
            console.log('asdasd')
            return {
                show : !prevState.show
            }
        })
    }
    
    render() {
        return (
            <div>
                <OnlineButton clicked = {this.click} />
                <OnlineBody users = {this.state.users} opacity = {this.state.show + 0}/>
            </div>
        );
    }
}

export default Online;
