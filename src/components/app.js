import React, { Component }   from 'react';
import Background             from './background';
import { testFx }             from '../actions';

class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Background
                style = {{
                    color : '#FBFFFE'
                }}
            >
                Hello World
            </Background>
        );
    }
}

export default App;