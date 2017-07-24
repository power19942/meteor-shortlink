import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:'',password:'',error:''}
    }
    onSubmit(e){
        e.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        Meteor.loginWithPassword({email},password,(err)=>{
           console.log('login callback',err);
        });
    }
    render(){
        return(
            <div>
                <h1>Short Link</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input ref='email' type="email" name="email" placeholder="Email"/>
                    <input ref='password' type="password" name="password" placeholder="Password"/>
                    <button>Login</button>
                </form>
                <Link to="/signup">Signup</Link>
            </div>
        )
    }
}