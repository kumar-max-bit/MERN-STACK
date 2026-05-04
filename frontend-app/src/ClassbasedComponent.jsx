import React from 'react';
import { Component } from 'react';
class ClassBasedComponent extends Component {
    render(){
        return(
            <div>
                <h1>Class Based Component</h1>
                <p>this is a class based component</p>
                <h3>Addition of 10 and 20 :{10+20}</h3>
            </div>
        )
    }
}
export default ClassBasedComponent;