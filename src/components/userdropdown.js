import React, { Component } from 'react';
import Block                from './block';
import err                  from '../morphs/err';
import trim                 from '../morphs/trimtext';

class UserDropdown extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys('this.props',this.props,['name','picture']);
    }
    render(){
        const { picture, name } = this.props;
        return(
            <Block
                name  = 'User Options'
                style = {{
                    height             : '34px',
                    borderRadius       : '5px',
                    backgroundColor    : '',
                    color              : '#FBFFFE',
                    userSelect         : 'none'
                }}
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
            </Block>
        );
    }
}

export default UserDropdown;