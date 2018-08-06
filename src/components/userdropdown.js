import React, { Component } from 'react';
import Block                from './block';
import err                  from '../morphs/err';
import trim                 from '../morphs/trimtext';
import randomString         from '../morphs/randomstring';

class DropdownItem extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['text','value']);
        ['value','text'].forEach( keyName => { err.isUndefined(`this.props.${keyName}`,this.props[keyName]); });
        this.onMouseEnter = this.onMouseEnter   .bind(this);
        this.onMouseLeave = this.onMouseLeave   .bind(this);
        this.onClick      = this.onClick        .bind(this);
        this.state = { 
            focused : false
        };
    }
    render(){
        const { onMouseEnter, onMouseLeave, onClick } = this;
        const { text } = this.props;
        const { focused } = this.state;
        let focusedStyle = {};
        if(focused)
            focusedStyle = {
                color           : '#FFC857',
                backgroundColor : '#FFFFFF26'
            };
        return(
            <div
                style = {{
                    display            : 'block',
                    boxSizing          : 'border-box',
                    height             : '32px',
                    width              : '180px',
                    position           : 'relative',
                    padding            : '5px 10px',
                    color              : '#FFFFFF',
                    transitionDuration : '0.3s',
                    userSelect         : 'none',
                    cursor             : 'pointer',
                    fontSize           : '16px',
                    borderTop          : '1px solid #FFFFFF40',
                    ...focusedStyle
                }}
                onClick      = {onClick}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
            >
                {(text||'???')}
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
        if('onClick' in this.props) this.props.onClick(this.props.value);
        else console.warn('onClick event handler for Dropdown Item has not been specified by parent component');
    }
}

class Dropdown extends Component{
    constructor(props){
        super(props);
        err.missingKey('this.props',this.props,'expand');
        err.isNotType('this.props.expand',this.props.expand,'boolean');
        this.options = ['Log Out'];
        this.onClick = this.onClick.bind(this);
    }
    render(){
        const { options, onClick} = this;
        const { expand } = this.props;
        return(
            <div
                name  = 'dropdown'
                style = {{
                    display            : 'block',
                    boxSizing          : 'border-box',
                    height             : expand ? `${Object.keys(options).length * 32}px` : '0px',
                    width              : '180px',
                    padding            : 0,
                    margin             : 0,
                    zIndex             : 20,
                    position           : 'absolute',
                    top                : '40px',
                    left               : 0,
                    transitionDuration : '0.3s',
                    overflow           : 'hidden',
                    backgroundColor    : '#071108',
                    borderRadius       : '2px',
                    boxShadow          : '1px 1px #07110840'
                }}
            >
                {
                    options ? 
                        options.map((option,i) => {
                            return(
                                <DropdownItem
                                    key     = {i}
                                    text    = {option}
                                    value   = {option}
                                    onClick = {onClick}
                                />
                            );
                        })
                    : void(0)
                }
            </div>
        );
    }
    onClick(option){
        switch(option){
            case 'Logout' :
                console.log('Log out')
            break;
        }
    }
}

class UserDropdown extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['name','picture']);
        this.onMouseEnter = this.onMouseEnter   .bind(this);
        this.onMouseLeave = this.onMouseLeave   .bind(this);
        this.state = {
            expand : false
        };
    }
    render(){
        const { onMouseEnter, onMouseLeave } = this;
        const { picture, name } = this.props;
        const { expand } = this.state;
        return(
            <Block
                name  = 'User Options'    
                style = {{
                    height          : expand ? '100px' : '34px',
                    borderRadius    : '5px',
                    backgroundColor : '',
                    color           : '#FBFFFE',
                    userSelect      : 'none',
                    overflow        : 'visible'
                }}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
            >
                <span
                    style = {{
                        display       : 'inline-block',
                        boxSizing     : 'border-box',
                        height        : '34px',
                        width         : '34px',
                        padding       : '3px',
                        margin        : 0,
                        verticalAlign : 'top'
                    }}
                >
                    <img
                        src = {picture}
                        style = {{
                            height       : '25px',
                            width        : '25px',
                            borderRadius : '50%',
                            border       : '1px solid #FFC85740'
                        }}
                    />
                </span>
                <span
                    style = {{
                        display       : 'inline-block',
                        boxSizing     : 'border-box',
                        height        : '34px',
                        width         : '160px',
                        margin        : 0,
                        verticalAlign : 'top',
                        padding       : '6px'
                    }}
                >
                    {typeof name === 'string' ? trim(name,15).result : '???' }
                </span>
                <Dropdown expand = {expand}/>
            </Block>
        );
    }
    onMouseEnter(){
        this.setState({ expand : true });
    }
    onMouseLeave(){
        this.setState({ expand : false });
    }
}

export default UserDropdown;