import React, { Component }     from 'react';
import Block                    from './block';
import SignInModal              from './signin_modal';
import randomString             from '../morphs/randomstring';


class SignIn extends Component{
    constructor(props){
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick      = this.onClick     .bind(this);
        this.uniqueString = randomString(10);
        this.modalID      = `modal-${this.uniqueString}`;
        this.containerID  = `${this.modalID}-container`;
        this.state = {
            modal   : false,
            focused : false,
            error   : false
        };
    }
    render(){
        const { onMouseEnter, onMouseLeave, onClick, containerID, modalID } = this;
        const { focused, modal, error } = this.state;
        let focusStyle = {};
        if(focused) focusStyle = {
            backgroundColor : '#FBFFFE40',
            color           : '#FFC857',
            ...this.props.focusStyle
        };
        return(
            <div id = {containerID}>
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
                    Sign In
                </Block>
                {
                    modal ?
                        <SignInModal
                            containerID = {containerID}
                            modalID     = {modalID}
                        />
                    : void(0)
                }
            </div>
        );
    }
    onMouseEnter(){
        this.setState({ focused : true });
    }
    onMouseLeave(){
        this.setState({ focused : false });
    }
    onClick(){
        this.setState({ modal : !this.state.modal });
    }
}

export default SignIn;