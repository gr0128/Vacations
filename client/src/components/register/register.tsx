import axios from 'axios';
import { Component, ChangeEvent } from 'react'
import successfulLoginDetails from '../../models/successfulLoginDetails';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./register.css";

interface RegisterState {
    username: string,
    password: string,
    fullname: string
}

export default class Register extends Component<any, RegisterState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            fullname: ""
        };
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const username = args.target.value;
        this.setState({ username });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    private setFullName = (args: ChangeEvent<HTMLInputElement>) => {
        const fullname = args.target.value;
        this.setState({ fullname });
    }

    private isPasswordValid = () =>{
        if (this.state.password.length === 0 || this.state.password.length > 7){
            return true;
        }
        return false
    }

    private register = async () => {
        try {
            //after register there's automatic login, so the axios request will return token and type (if it'll be successful)
            const response = await axios.post<successfulLoginDetails>("http://34.65.179.31:3001/users/register", this.state);
            const serverResponse = response.data;
            axios.defaults.headers.common['Authorization'] = serverResponse.token;
            sessionStorage.setItem("token",serverResponse.token);
            store.dispatch({ type: ActionType.ChangeLoginStatus, payload: serverResponse.type });
            //there's no chance the user type will be "ADMIN" after registration
            this.props.history.push('/vacations')
            sessionStorage.setItem("userType", "CUSTOMER");
        }
        catch (e) {
            alert(e.response.data.error);
        }
    }

    public render() {
        return (
            <div className="registerPage">
                <div className="registerForm">
                    <h1>Fill in your details to start exploring</h1>
                    <input type="text" placeholder="User name" name="username"
                        value={this.state.username} onChange={this.setUserName} /><br />
                    <input type="password" placeholder="Password" name="password"
                        value={this.state.password} onChange={this.setPassword} /><br />
                    <input type="text" placeholder="Full Name (optional)" name="fullName"
                        value={this.state.fullname} onChange={this.setFullName} /><br />
                    {!this.isPasswordValid() && <p>password must be at least 8 characters</p>}
                    <input type="button" value="register" onClick={this.register} /><br />
                    <a href="/login">Back to login</a>
                    <br />
                </div>
            </div>
        );
    }
}