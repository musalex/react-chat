import React, {PureComponent} from 'react';

import classes from './Message.css';

class Message extends PureComponent {
    constructor(props) {
        super(props);
        this.msgCon = React.createRef();
        this.msg = React.createRef();
    }

    componentDidMount() {
        this.msgCon.current.style.height = this.msg.current.offsetHeight + 'px';
    }
    componentDidUpdate() {
        this.msgCon.current.style.height = this.msg.current.offsetHeight + 'px';
        console.log('asd');
    }

    render() {
        const msgClass = [classes.Message, classes[this.props.sentType]];
        const Nickname = this.props.sentType === 'getMsg' ? 
            <div className={classes.nick}> 
                {this.props.nickName} 
            </div> : null;

        return (
            <div ref = {this.msgCon} className={classes.msgContainer}>
                <div ref = {this.msg} className={msgClass.join(' ')}>
                    {Nickname}
                    <div className={classes.textWrapper}>
                        <div className={classes.text}>
                            {this.props.text}
                        </div>
                        <div className={classes.textSpace}>

                        </div>
                    </div>
                    <div className={classes.time}>
                        {this.props.time}
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
