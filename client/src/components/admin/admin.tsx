import axios from 'axios';
import React, { Component } from 'react'
import { Unsubscribe } from 'redux';
import { io } from 'socket.io-client';
import Vacation from '../../models/Vacation';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import VacationCardForAdmin from "../vacation-card-for-admin/vacationCardForAdmin";
import "./admin.css"

interface AdminState {
    vacationsArr : Vacation[];
}

export default class Admin extends Component<any,AdminState>{

    private unsubscribeStore : Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {vacationsArr : []};

        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ vacationsArr: store.getState().vacations});
        });
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    public async componentDidMount() {
        this.adminValidation();
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
        //get all vacations from DB
        const response = await axios.get<Vacation[]>("http://34.65.179.31:3001/vacations/");
        const vacationsArr = response.data;
        store.dispatch({ type: ActionType.GetAllVacations, payload: vacationsArr});
        //saving the vacation in local storage, so after refresh the data will be saved,
        //without it, the charts component will colapse after refresh, because there isn't axios request there
        sessionStorage.setItem("vacations",JSON.stringify(vacationsArr));
        //create connection to the socket, and keeping the socket object in store,
        //because logout is in another component 
        const socket = io('http://34.65.179.31:3002/', { query: "token=" + sessionStorage.getItem("token") }).connect();
        store.dispatch({ type: ActionType.getSocket, payload: socket});
    }

    //preventing the option to nevigate to admin without login
    private adminValidation = () =>{
        if (store.getState().userType === "CUSTOMER"){
            this.props.history.push("/vacations");
        }
        if (store.getState().userType === ""){
            this.props.history.push("/login");
        }
    }

    public render(){
        return (
            <div className="admin">
                {this.state.vacationsArr.map( (vacation) => {
                    return <VacationCardForAdmin vacation={vacation} key={vacation.id}/>
                })}
                <VacationCardForAdmin key={0}/>
            </div>
        );
    }
}