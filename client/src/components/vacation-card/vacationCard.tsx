import React, { Component } from 'react';
import Vacation from '../../models/Vacation';
import "./vacationCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';


interface VacationProps {
    vacation: Vacation
}

export default class VacationCard extends Component<VacationProps>{
    public constructor(props: VacationProps) {
        super(props);   
    }

    private follow = async () => {
        try {
            //add follow in DB
            await axios.post<void>("http://34.65.179.31:3001/vacations/add-follow", { vacationId: this.props.vacation.id });
            //add follow in client (store)
            store.dispatch({type: ActionType.follow, payload: this.props.vacation.id});
        }
        catch (e) {
            alert(e.response.data.error);
        }
    }

    private unfollow = async () => {
        try {
            //remove follow in DB
            await axios.delete<void>("http://34.65.179.31:3001/vacations/unfollow/" + this.props.vacation.id);
            //remove follow in client (store)
            store.dispatch({type: ActionType.unfollow, payload: this.props.vacation.id});
        }
        catch (e) {
            alert(e.response.data.error);
        }
    }

    render() {
        return (
            <div className="vacation">
                <img src={this.props.vacation.imageUrl} alt="Sorry! can't load content"></img>
                <div className="destination">{this.props.vacation.destination}</div>
                <div className="description">{this.props.vacation.description}</div>
                <div className="dates-and-followers">{this.props.vacation.startDate}-{this.props.vacation.endDate}<br />
                followers: {this.props.vacation.followers}</div>
                <div className="price">
                    {this.props.vacation.price}$
                </div>
                {this.props.vacation.isFollowing == true &&
                    <div className="follow">
                        <FontAwesomeIcon className="heart" icon={faHeart} size="2x" onClick={this.unfollow} />
                        <span className="unfollow-tooltip">unfollow</span>
                    </div>}
                {this.props.vacation.isFollowing == false &&
                    <div className="follow">
                        <FontAwesomeIcon className="emptyheart" icon={faHeart} size="2x" onClick={this.follow} />
                        <span className="follow-tooltip">follow</span>
                    </div>}

            </div>
        )
    }
}