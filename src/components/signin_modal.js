import React, { Component }     from 'react';
import SketchModal              from './sketchmodal';
import Block                    from './block';
import err                      from '../morphs/err';
import { googleAuthentication } from '../actions/firebase';

class SignInModal extends Component{
    constructor(props){
        super(props);
        this.state = { display : true };
        this.onExit = this.onExit.bind(this);
        err.missingAnyKeys('this.props',this.props,['modalID','containerID']);
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
                            width       = '800px'
                            height      = '400px'
                        >
                            <Block

                            >
                                Hello World
                            </Block>
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