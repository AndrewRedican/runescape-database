import React, { Component }     from 'react';
import SketchModal              from './sketchmodal';
import Block                    from './block';
import GoogleLogin              from './signin_button_google';
import Checkbox                 from 'rc-checkbox';
import err                      from '../morphs/err';
import 'rc-checkbox/assets/index.css';

class SignInModal extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['modalID','containerID','onExitModal','StorageKeys']);  
        err.missingAnyKeys('this.props.StorageKeys',this.props.StorageKeys,['localStorageKey','sessionStorageKey']);      
        this.onExit = this.onExit.bind(this);
        this.state  = { 
            display  : true,
            remember : false
        };
    }
    render(){
        const { modalID, containerID, StorageKeys } = this.props;
        const { display, remember } = this.state;
        return(
            <div id = {containerID} >
                {
                    display ?
                        <SketchModal
                            modalID     = {modalID}
                            containerID = {containerID}
                            onExit      = {this.onExit}
                            width       = '350px'
                            height      = '350px'
                        >
                            <div
                                style = {{
                                    display   : 'block',
                                    boxSizing : 'border-box',
                                    width     : '350px',
                                    height    : '350px',
                                    position  : 'relative'
                                }}
                            >
                                <Block
                                    style = {{
                                        display    : 'block',
                                        width      : '350px',
                                        height     : '60px',
                                        userSelect : 'none'
                                    }}
                                >
                                    <Block
                                        center = 'horizontally'
                                        style = {{
                                            display    : 'block',
                                            width      : '300px',
                                            height     : '60px',
                                            fontSize   : '28px',
                                            fontWeight : 400,
                                            padding    : '10px'
                                        }}
                                    >
                                        Sign In
                                    </Block>
                                </Block>
                                <Block
                                    style = {{
                                        display   : 'block',
                                        boxSizing : 'border-box',
                                        width     : '350px',
                                        height    : '240px',
                                        top       : '60px'
                                    }}
                                >
                                    <div
                                        style = {{
                                            display    : 'block',
                                            boxSizing  : 'border-box',
                                            height     : '40px',
                                            width      : '100%',
                                            padding    : '5px',
                                            fontWeight : 600,
                                            color      : '#454545',
                                            userSelect : 'none'
                                        }}
                                    >
                                        Options
                                    </div>
                                    <div
                                        style = {{
                                            display    : 'block',
                                            boxSizing  : 'border-box',
                                            height     : '200px',
                                            width      : '100%',
                                            padding    : '20px',
                                            fontWeight : 600
                                        }}
                                    >
                                        <div
                                            style = {{
                                                display      : 'block',
                                                boxSizing    : 'border-box',
                                                height       : '100%',
                                                width        : '100%',
                                                padding      : '20px',
                                                border       : '1px solid #45454580',
                                                borderRadius : '5px',
                                                fontWeight   : 600
                                            }}
                                        >
                                            <GoogleLogin remember = {remember ? StorageKeys : false}/>
                                        </div>
                                    </div>
                                </Block>
                                <Block
                                    style = {{
                                        display   : 'block',
                                        boxSizing : 'border-box',
                                        width     : '350px',
                                        height    : '50px',
                                        top       : '300px'
                                    }}
                                >
                                    <Checkbox
                                        defaultChecked
                                        onChange = {(value) => { this.setState({ remember : value })}}
                                        disabled = {false}
                                    />
                                    <span
                                        style = {{
                                            padding : '1px 8px'
                                        }}
                                    >
                                        Remember Me
                                    </span>
                                </Block>
                            </div>
                        </SketchModal>
                    : void(0)
                }
            </div>
        );
    }
    onExit(){
        if(!this.state.display) return;
        this.setState({ display : false });
        if('onExitModal' in this.props) this.props.onExitModal();
    }
}

export default SignInModal;