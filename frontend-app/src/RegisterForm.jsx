//register form
import React, { Component } from 'react';
import './FormStyle.css';
 
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', this.state);
        alert(`Welcome, ${this.state.username}!`);
        
        // Clear the form fields after submission
        this.setState({
            username: '',
            email: '',
            password: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                            id="username"
                            type="text" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            id="email"
                            type="email" 
                            name="email" 
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            required
                        />
                    </div>
                    
                    <button type="submit">
                        Register
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default RegisterForm;