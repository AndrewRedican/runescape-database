import React, { Component } from 'react';
import err                  from '../morphs/err';
import Block                from './block';

class Header extends Component{
    constructor(props){
        super(props);
        this.setListener      = this.setListener      .bind(this);
        this.removeListener   = this.removeListener   .bind(this);
        this.updateDimensions = this.updateDimensions .bind(this);
        this.state = { width  : '100%' };
    }
    render(){
        return(
            <Block
                name  = 'header'
                style = {{
                    display         : 'block',
                    width           : this.state.width,
                    height          : (this.props.height||'80px'),
                    backgroundColor : '#071108',
                    padding         : '20px',
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
        this.setState({ width  : `${window.innerWidth}px` });
    }
    componentDidCatch(){ 
        this.setState({ hasError : true });
    }
}

export default Header;