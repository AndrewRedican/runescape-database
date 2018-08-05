import React, { Component } from 'react';
import err                  from '../morphs/err';
import Block                from './block';

class Content extends Component{
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
                name  = 'content-wide'
                style = {{
                    display         : 'block',
                    width           : width,
                    height          : height,
                    backgroundColor : 'none',
                    top             : '80px',
                    ...this.props.styleWide
                }}
            >
                <Block
                    name   = 'content'
                    center = 'horizontally'
                    style  = {{
                        width           : (this.props.width||'1070px'),
                        height          : (this.props.height||height||'800px'),
                        backgroundColor : '#FBFFFE',
                        ...this.props.style
                    }}
                >
                    {this.props.children}
                </Block>
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
        let { innerWidth, innerHeight } = window;
        this.setState({ 
            width  : `${innerWidth}px`,
            height : `${innerHeight > 80 ? innerHeight - 80 : innerHeight  }px`
        });
    }
    componentDidCatch(){ 
        this.setState({ hasError : true });
    }
}

export default Content;