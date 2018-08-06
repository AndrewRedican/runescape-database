import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import { googleAuthentication } from '../actions/firebase';
import Block                    from './block';
import SignInModal              from './signin_modal';
import UserDropdown             from './userdropdown';
import randomString             from '../morphs/randomstring';
import err                      from '../morphs/err';


class SignIn extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['UserData','localStorageKey']);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick      = this.onClick     .bind(this);
        this.onExitModal  = this.onExitModal .bind(this);
        this.onLogin      = this.onLogin     .bind(this);
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
        const { onMouseEnter, onMouseLeave, onClick, containerID, modalID, onExitModal, onLogin } = this;
        const { focused, modal, error } = this.state;
        const { UserData, localStorageKey } = this.props;
        let focusStyle = {};
        if(focused) focusStyle = {
            backgroundColor : '#FBFFFE40',
            color           : '#FFC857',
            ...this.props.focusStyle
        };
        if(UserData===null) return <noscript />;
        return(
            <div id = {containerID}>
                {
                    UserData ?
                        <UserDropdown
                            name    = {UserData.name}
                            picture = {UserData.picture}
                        />
                    :
                    <React.Fragment>
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
                                userSelect         : 'none',
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
                                    localStorageKey = {localStorageKey}
                                    containerID     = {containerID}
                                    modalID         = {modalID}
                                    onExitModal     = {onExitModal}
                                    onLogin         = {onLogin}
                                />
                            : void(0)
                        }
                    </React.Fragment>
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
        if(!this.state.modal) this.setState({ modal : true });
    }
    onExitModal(){
        if(this.state.modal) this.setState({ modal : false });
    }
    onLogin(localStorageKey){
        this.props.googleAuthentication({ localStorageKey : localStorageKey });
    }
}

function mapStateToProps(state){
    const { UserData, AppData } = state;
    return {
        localStorageKey : AppData ? AppData.localStorageKey : false,
        UserData        : UserData
    };
}

function mapDispatchToProps(dispath){
    return bindActionCreators({
        googleAuthentication : googleAuthentication
    }, dispath);
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);