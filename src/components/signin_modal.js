import React, { Component }     from 'react';
import SketchModal              from './sketchmodal';
import Block                    from './block';
import GoogleLogin              from './signin_button_google';
import err                      from '../morphs/err';

class SignInModal extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['modalID','containerID']);        
        this.onExit           = this.onExit.bind(this);
        this.state            = { display : true };
    }
    render(){
        const { modalID, containerID } = this.props;
        return(
            <div id = {containerID} >
                {
                    this.state.display ?
                        <SketchModal
                            modalID     = {modalID}
                            containerID = {containerID}
                            onExit      = {this.onExit}
                            width       = '400px'
                            height      = '300px'
                        >
                            <div
                                style = {{
                                    display   : 'block',
                                    boxSizing : 'border-box',
                                    width     : '400px',
                                    height    : '300px',
                                    position  : 'relative'
                                }}
                            >
                                <Block
                                    style = {{
                                        display    : 'block',
                                        width      : '400px',
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
                                        width     : '400px',
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
                                            <GoogleLogin/>
                                        </div>
                                    </div>
                                </Block>
                            </div>
                        </SketchModal>
                    : void(0)
                }
            </div>
        );
    }
    onExit(){
        if(this.state.display) this.setState({ display : false });
    }
}

export default SignInModal;