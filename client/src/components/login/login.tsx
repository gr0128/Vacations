import React, { Component, ChangeEvent } from 'react';
import axios from "axios";
import successfulLoginDetails from '../../models/successfulLoginDetails';
import "./login.css";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

interface LoginState {
    username: string,
    password: string,
    isFailedLogin:boolean
}

export default class Login extends Component<any, LoginState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isFailedLogin: false
        };

        
    }

    componentDidMount(){
        //if the user is already logged in, go to the relevant page for him
        if(sessionStorage.getItem("userType") === "ADMIN"){
            this.props.history.push('/admin');
        }
        else if(sessionStorage.getItem("userType") === "CUSTOMER"){
            this.props.history.push('/vacations');
        }
    }
    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    private login = async() => {
        try {
            const response = await axios.post<successfulLoginDetails>("http://34.65.179.31:3001/users/login", this.state);
            const serverResponse = response.data;
            axios.defaults.headers.common['Authorization'] = serverResponse.token;
            sessionStorage.setItem("token",serverResponse.token);
            store.dispatch({ type: ActionType.ChangeLoginStatus, payload: serverResponse.type });
            
            if (serverResponse.type === "ADMIN") {
                this.props.history.push('/admin')
                sessionStorage.setItem("userType", "ADMIN");
            }
            else if (serverResponse.type === "CUSTOMER") {
                this.props.history.push('/vacations')
                sessionStorage.setItem("userType", "CUSTOMER");
            }
        }
        catch (err) {
            //this will make an error message visible
            this.setState({isFailedLogin:true});
        }

    }

    private nevigateToRegister = () => {
        this.props.history.push('/register');
    }

    public render() {
        return (
            <div className="loginPage">
                <div className="loginForm">
                    <h1>Your perfect vacation starts here!</h1>
                    <h1>Login or register to view all vacations</h1>
                    <input type="text" placeholder="User name" name="username"
                        value={this.state.username} onChange={this.setUserName} /><br />
                    <input type="password" placeholder="Password" name="password"
                        value={this.state.password} onChange={this.setPassword} /><br />
                    {this.state.isFailedLogin && <p>Username or password does not exist</p>}
                    <input type="button" value="login" onClick={this.login} className="loginButton"/><br />
                    <input type="button" value="register" onClick={this.nevigateToRegister} />
                    <br/>
                </div>
            </div>
        );
    }
}
