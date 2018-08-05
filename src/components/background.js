import React, { Component } from 'react';
import err                  from '../morphs/err';
import Block                from './block';

class Background extends Component{
    constructor(props){
        super(props);
        this.setListener      = this.setListener      .bind(this);
        this.removeListener   = this.removeListener   .bind(this);
        this.updateDimensions = this.updateDimensions .bind(this);
        this.state = {
            height : '100%',
            width  : '100%'
        };
    }
    render(){
        const { height, width } = this.state;
        return(
            <Block
                name  = 'background'
                style = {{
                    width           : width,
                    height          : height,
                    backgroundColor : '#B7B3A1',
                    top             : 0,
                    left            : 0,
                    ...this.props.style
                }}
            >
                {this.props.children}
            </Block>
        );
    }
    componentDidMount(){
        this.updateDimensions();
        this.setListener('resize',this.updateDimensions);
    }
    componentWillUnmount(){
        this.removeListener('resize',this.updateDimensions);
    }
    setListener(actionType,callbackFunction) {
        err.isNotType('actionType',actionType,'string');
        err.isUndefined('callbackFunction',callbackFunction);
        window.addEventListener(actionType, callbackFunction, true); 
    }
    removeListener(actionType,callbackFunction) {
        err.isNotType('actionType',actionType,'string');
        err.isUndefined('callbackFunction',callbackFunction);
        window.removeEventListener(actionType, callbackFunction, true);
    }
    updateDimensions(){
        this.setState({ 
            width  : `${window.innerWidth}px`,
            height : `${window.innerHeight}px`
        });
    }
    componentDidCatch(){ 
        this.setState({ hasError : true });
    }
}

export default Background;