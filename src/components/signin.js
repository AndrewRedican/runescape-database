import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import Block                    from './block';
import SignInModal              from './signin_modal';
import randomString             from '../morphs/randomstring';
import err                      from '../morphs/err';


class SignIn extends Component{
    constructor(props){
        super(props);
        err.missingKey('this.props',this.props,'UserData');
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick      = this.onClick     .bind(this);
        this.onExitModal  = this.onExitModal .bind(this);
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
        const { onMouseEnter, onMouseLeave, onClick, containerID, modalID, onExitModal } = this;
        const { focused, modal, error } = this.state;
        const { UserData, StorageKeys } = this.props;
        let focusStyle = {};
        if(focused) focusStyle = {
            backgroundColor : '#FBFFFE40',
            color           : '#FFC857',
            ...this.props.focusStyle
        };
        if(!UserData)
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
                            StorageKeys = {StorageKeys}
                            containerID = {containerID}
                            modalID     = {modalID}
                            onExitModal = {onExitModal}
                        />
                    : void(0)
                }
            </div>
        );

        console.log({User})

        return(
            <Block>
                Already logged in!!
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
        if(!this.state.modal) this.setState({ modal : true });
    }
    onExitModal(){
        if(this.state.modal) this.setState({ modal : false });
    }
}

function mapStateToProps(state){
    const { UserData, AppData } = state;
    return {
        StorageKeys : {
            localStorageKey   : AppData ? AppData.localStorageKey : false,
            sessionStorageKey : AppData ? AppData.sessionStorageKey : false
        },
        UserData    : UserData
    };
}

export default connect(mapStateToProps,null)(SignIn);