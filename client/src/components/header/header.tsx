import React, {Component} from "react";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./header.css";
import { withRouter } from "react-router-dom";
import { Unsubscribe } from "redux";

interface HeaderState {
    userType : string;
}

export class Header extends Component<any,HeaderState>{
    private unsubscribe: Unsubscribe;
    public constructor(props: any) {
        super(props);
        //keeping the user type in state, so we can show the relevant button(s) on screen
        this.state = {userType : store.getState().userType};

        this.unsubscribe=store.subscribe(() => {
            this.setState({ userType: store.getState().userType});
        });
    }
    public componentWillUnmount(){
        this.unsubscribe();
    }

    private logout = () => {
        //when logging out, remove all the information about the user from session storage & store
        store.dispatch({type:ActionType.ChangeLoginStatus, payload:""});
        sessionStorage.removeItem("userType");
        sessionStorage.removeItem("token");
        //go to login page
        this.props.history.push('/');
        //get the socket object from store, and disconnect
        let socket = store.getState().socket;
        socket.disconnect();
    }

    private goToReports = () =>{
        this.props.history.push('/charts');
    }

    private goToAdmin = () =>{
        this.props.history.push('/admin');
    }

    private goToLogin = () =>{
        this.props.history.push('/login');
    }

    render(){
        return(
            <div className="header">
                <h1>VacationPlanner.com</h1>
                {this.state.userType === "ADMIN" && <div>
                <input type="button" value="Logout" onClick={this.logout}></input>
                <input type="button" value="Reports" onClick={this.goToReports}></input>
                <input type="button" value="Vacations" onClick={this.goToAdmin}></input>
                </div>}
                {this.state.userType === "CUSTOMER" && <div>
                <input type="button" value="Logout" onClick={this.logout}></input>
                </div>}
            </div>
        )
    }
   
}
export default withRouter(Header);