import axios from "axios";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { io } from "socket.io-client";
import Vacation from "../../models/Vacation";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import VacationCard from "../vacation-card/vacationCard";
import "./vacations.css";


interface VacationsState {
    vacationsArr : Vacation[];
}

export default class Vacations extends Component<any, VacationsState>{

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
        this.customerValidation();
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
        //get all vacations from DB
        const vacations = await this.getVacations();
        store.dispatch({ type: ActionType.GetAllVacations, payload: vacations});
        
        //create connection to the socket, and keeping the socket object in store,
        //because logout is in another component 
        const socket = io('http://34.65.179.31:3002/', { query: "token=" + sessionStorage.getItem("token") }).connect();
        socket.on("DELETE_VACATION",(vacationId:number)=>{
            store.dispatch({ type: ActionType.DeleteVacation, payload: vacationId});
        });
        socket.on("UPDATE_VACATION",(vacation:Vacation)=>{
            store.dispatch({ type: ActionType.UpdateVacation, payload: vacation});
        });
        store.dispatch({ type: ActionType.getSocket, payload: socket});

    }

    //preventing the option to nevigate to vacations component without login
    private customerValidation = () =>{
        if (store.getState().userType === "ADMIN"){
            this.props.history.push("/admin");
        }
        if (store.getState().userType === ""){
            this.props.history.push("/login");
        }
    }

    private getVacations = async () =>{
        const response = await axios.get<Vacation[]>("http://34.65.179.31:3001/vacations/");
        const vacationsArr = response.data;
        //sorting the vacations, those followed by the user will be first
        vacationsArr.sort((a,b) => {
            return (a.isFollowing === b.isFollowing) ? 0 : a.isFollowing ? -1 : 1;
        });
        return vacationsArr;
    }

    public render() {
        return (
            <div className="vacationsPage">
                {this.state.vacationsArr.map( (vacation) => {
                    return <VacationCard vacation={vacation} key={vacation.id}/>
                })}
            </div>
        )
    }
}