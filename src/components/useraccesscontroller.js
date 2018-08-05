import React, { Component } from 'react';
import Block                from './block';
import SignIn               from './signin';

class UserAccessController extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Block
                name  = 'user-access'
                style = {{
                    right  : 0,
                    width  : '200px',
                    height : '34px'
                }}
            >
                <SignIn/>
            </Block>
        );
    }
    componentDidMount(){

    }
}

export default UserAccessController;