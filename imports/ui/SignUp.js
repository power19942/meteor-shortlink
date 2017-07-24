import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:'',password:'',error:''}
    }
    onSubmit(e){
        e.preventDefault();

         const email = this.refs.email.value;
         const password = this.refs.password.value;

        Accounts.createUser({email,password},(err)=>{

            if(err){
                this.setState({error:err.reason})
            }else{
                this.setState({error:''})
            }
        });

    }
    render(){
        return(
            <div>
                <h1>Join Short Link</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input ref='email' type="email" name="email" placeholder="Email"/>
                    <input ref='password' type="password" name="password" placeholder="Password"/>
                    <button>Create Account</button>
                </form>
                <Link to="/login">login</Link>
            </div>
        )
    }
}