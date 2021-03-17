import { Socket } from "socket.io-client";
import Vacation from "../models/Vacation";

export class AppState {
    public vacations: Vacation[] = JSON.parse(sessionStorage.getItem("vacations"));
    public userType: string = sessionStorage.getItem("userType") != null? sessionStorage.getItem("userType"): "";
    public socket: Socket;
}