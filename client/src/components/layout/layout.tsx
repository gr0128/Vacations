import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Admin from '../admin/admin';
import Charts from '../charts/charts';
import Header from '../header/header';
import Login from "../login/login"
import Register from '../register/register';
import Vacations from '../vacations/vacations';
import "./layout.css";

export default class Layout extends Component {
    public render() {
        return (
            <BrowserRouter>
                <section className="layout">
                    <header>
                            <Header />
                    </header>
                    <main>
                        <Switch>
                            <Route path="/login" component={Login} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/admin" component={Admin} exact />
                            <Route path="/register" component={Register} exact />
                            <Route path="/charts" component={Charts} exact />
                            <Redirect to="/login" exact />
                        </Switch>
                    </main>
                </section>
            </BrowserRouter>
        )
    }
}