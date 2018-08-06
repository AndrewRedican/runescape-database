import React, { Component } from 'react';

/**
 * Basic Build Block of UI
 * Opted for elements that can stack next to each other
 * Can also be easily centered
 */

class Block extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let customStyle = {};
        if(typeof this.props.center === 'string'){
            if(this.props.center.indexOf('vertical')>-1)   customStyle = { ...customStyle, top  : '50%' };
            if(this.props.center.indexOf('horizontal')>-1) customStyle = { ...customStyle, left : '50%' };
        }
        if(Object.keys(customStyle).length>0)
            customStyle = { 
                ...customStyle,
                transform : `translate(-${(customStyle.left||'0%')},-${(customStyle.top||'0%')})`
            };
        return(
            <span
                style = {{
                    display       : 'inline-block',
                    boxSizing     : 'border-box',
                    margin        : 0,
                    padding       : 0,
                    position      : 'absolute',
                    verticalAlign : 'top',
                    overflowX     : 'visible',
                    overflowY     : 'visible',
                    ...customStyle,
                    ...this.props.style
                }}
            >
                <div
                    style = {{
                        display   : 'inline-block',
                        boxSizing : 'border-box',
                        margin    : 0,
                        padding   : 0,
                        height    : '100%',
                        width     : '100%',
                        position  : 'relative',
                        overflowX : 'visible',
                        overflowY : 'visible'
                    }}
                    onMouseEnter = {this.props.onMouseEnter}
                    onMouseLeave = {this.props.onMouseLeave}
                    onClick      = {this.props.onClick}
                >
                    {this.props.children}
                </div>
            </span>
        );
    }
}

export default Block;