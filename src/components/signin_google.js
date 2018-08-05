import React, { Component }     from 'react';
import Block                    from './block';
import { googleAuthentication } from '../actions/firebase';

class SignInWithGoogle extends Component{
    constructor(props){
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick      = this.onClick     .bind(this);
        this.state = {
            focused        : false,
            authenticating : false,
            error          : false
        };
    }
    render(){
        const { onMouseEnter, onMouseLeave, onClick } = this;
        const { focused, authenticating, error } = this.state;
        let focusStyle = {};
        if(focused) focusStyle = {
            backgroundColor : '#FBFFFE40',
            color           : '#FFC857',
            ...this.props.focusStyle
        };
        return(
            <Block
                name  = 'Sign In'
                style = {{
                    height             : '34px',
                    padding            : '6px 10px',
                    borderRadius       : '5px',
                    backgroundColor    : '',
                    color              : '#FBFFFE',
                    cursor             : 'pointer',
                    transitionDuration : '0.3s',
                    ...this.props.style,
                    ...focusStyle
                }}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
                onClick      = {onClick}
            >
                {
                    !authenticating ?
                        'Sign In'
                    : 'Authenticating...'   
                }
            </Block>
        );
    }
    onMouseEnter(){
        this.setState({ focused : true });
    }
    onMouseLeave(){
        this.setState({ focused : false });
    }
    onClick(){
        this.setState({ authenticating : true });
        googleAuthentication();
    }
}

export default SignInWithGoogle;