import React, { Component } from 'react';

class Borders extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div
                style = {{
                    display       : 'block',
                    height        : '100%',
                    width         : '100%',
                    boxSizing     : 'border-box',
                    top           : 0,
                    bottom        : 0,
                    left          : 0,
                    right         : 0,
                    margin        : 0,
                    padding       : (this.props.padding||'5px'),
                    paddingTop    : (this.props.paddingTop||'5px'),
                    paddingBottom : (this.props.paddingBottom||'5px'),
                    paddingLeft   : (this.props.paddingLeft||'5px'),
                    paddingRight  : (this.props.paddingRight||'5px'),
                    position      : 'absolute',
                    ...this.props.paddingTop,
                    ...this.props.paddingDown,
                    ...this.props.paddingLeft,
                    ...this.props.paddingRight,
                }}
            >
                <div
                    style = {{
                        display       : 'block',
                        height        : '100%',
                        width         : '100%',
                        boxSizing     : 'border-box',
                        borderRadius  : '5px',
                        borderWidth   : '1px',
                        borderStyle   : 'solid',
                        borderColor   : '#CFDBD5',
                        position      : 'relative',
                        padding       : '5px',
                        ...this.props.style
                    }}
                    { ...this.props }
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Borders;