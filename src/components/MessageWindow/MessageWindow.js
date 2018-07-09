import React, {PureComponent} from 'react';
import axios from '../../axios-orders';
import classes from './MessageWindow.css';

class MessageWindow extends PureComponent {
    constructor(props) {
        super(props);
        
        this.inputRef = React.createRef();
        this.sendHandler = this.sendHandler.bind(this);
    }

    componentDidMount() {
        setTimeout(()=>{this.inputRef.current.focus()}, 0);
        console.log(this.inputRef.current.value.indexOf('\n'));
    }
    
    sendHandler(e) {
        if (e.keyCode !== 13 || e.shiftKey) return;
        e.preventDefault();
        if (e.target.value == '') return;
        let dateString = (new Date()).toString().split(' ')[4].slice(0,-3);

        let text = e.target.value.split(' ');
        // text = text.map(e=>check(e,355)).join(' ');

        let obj = {
            text : text,
            time : dateString,
            user : this.props.user,
        };

        e.target.value = '';
        axios.post('/messages.json', obj)
            .then(response => {
                console.log(response)
            });
        this.props.send(obj);
    }
    render() { 
        return (
            <div className = {classes.MessageWindow}>
                <textarea 
                    ref={this.inputRef}
                    maxLength="250" 
                    placeholder="Write a message..." 
                    className={classes.MsgForm} 
                    spellCheck="false"
                    onKeyDown = {this.sendHandler}
                />
            </div>
        )
    };
}

// function check(str, max) {
//     let span = document.createElement('span');
//     span.textContent = str;
//     document.body.append(span);

//     var k = span.offsetWidth / max;
//     if (k <= 1) {
//         span.remove();
//         return str;
//     }
    
//     let chunkLength = str.length / k | 0;
//     let res = [];
    
//     for (let i = 0; i <= k; i++) {
//         res.push(str.slice(i * chunkLength, (i+1) * chunkLength))
//     }
//     span.remove();
//     return res.map(e=>check(e,max)).join(' ');  
// }

function check(str, max) {
    let span = document.createElement('span');
    span.textContent = str;
    document.body.append(span);

    var k = span.offsetWidth / max;
    if (k < 1) {
        span.remove();
        return str;
    }
    
    let res = [];
    span.textContent = '';

    for (let i = 0, lastIndex = 0; i <= str.length; i++) {
       span.textContent += str[i];
       k = span.offsetWidth / max;
       if (k >= 1) {
           res.push(str.slice(lastIndex, i+1));
           span.textContent = '';
           lastIndex = i+1;
       }
    }
    span.remove();
    return res.join(' ');  
}

export default MessageWindow;
