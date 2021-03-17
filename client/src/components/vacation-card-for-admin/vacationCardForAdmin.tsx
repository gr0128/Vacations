import React, { Component, ChangeEvent } from 'react';
import Vacation from '../../models/Vacation';
import "./vacationCardForAdmin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';



interface VacationProps {
    vacation?: Vacation
}

interface VacationState {
    vacation: Vacation,
    isEditing: boolean,
    isNewVacation: boolean
}

export default class VacationCardForAdmin extends Component<VacationProps, VacationState>{
    
    
    public constructor(props: VacationProps) {
        super(props);
        if(props.vacation !== undefined){
            this.state = { vacation: this.props.vacation, isEditing: false, isNewVacation: false }
        }
        //if there is no props, we will treat this component as an empty vacation,
        //and the only thing we would be able to do with it is to add vacation (after filling all the fields)
        else{
            this.state = { vacation: new Vacation("","","",this.getTodayDate(),this.getTodayDate(),1), isEditing: true, isNewVacation: true }
        }
    }

    //when clicking on the pencil icon, changing the view of the component to editable one
    private edit = () => {
        this.setState({ isEditing: true });
    }

    private deleteVacation = async () => {
        //if the vacation is new, there is no deleting option
        if(!this.state.isNewVacation){
            try {
                //delete vacation from DB
                await axios.delete<void>("http://34.65.179.31:3001/vacations/"+this.state.vacation.id);
                //delete vacation from store
                store.dispatch({ type: ActionType.DeleteVacation, payload: this.state.vacation.id });
            }
            catch (e) {
                alert(e.response.data.error);
            }
        }
    }
    private updateVacation = async () => {
        try{
            //update DB
            await axios.put<void>("http://34.65.179.31:3001/vacations/", this.state.vacation);
            //update store
            store.dispatch({ type: ActionType.UpdateVacation, payload: this.state.vacation});
            //changing the view to not editable after editing is complete
            this.setState({ isEditing: false });
        }
        catch(e){
            alert(e.response.data.error);
        }
    }

    private discardChanges = async () => {
        //if we want to cancel changes, get the initial vacation data (from props)
        const vacation = this.props.vacation;
        this.setState({ vacation });
        this.setState({ isEditing: false });
    }

    private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
        let vacation = { ...this.state.vacation }
        vacation.destination = args.target.value;
        this.setState({ vacation });
    }

    private setDescription = (args: ChangeEvent<HTMLTextAreaElement>) => {
        let vacation = { ...this.state.vacation }
        vacation.description = args.target.value;
        this.setState({ vacation });
    }

    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        let vacation = { ...this.state.vacation };
        const price = +args.target.value;
        //can't change the price to anything other then positive number
        if(typeof(price) === "number" && price>0){
            vacation.price = price;
        }
        this.setState({ vacation });
    }

    private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
        let vacation = { ...this.state.vacation }
        const value = args.target.value;
        const date = this.getDateFormatToDisplay(value);
        vacation.startDate = date;
        this.setState({ vacation });
    }

    private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        let vacation = { ...this.state.vacation }
        const value = args.target.value;
        const date = this.getDateFormatToDisplay(value);
        vacation.endDate = date;
        this.setState({ vacation });
    }

    private setUrl = (args: ChangeEvent<HTMLInputElement>) => {
        let vacation = { ...this.state.vacation }
        vacation.imageUrl = args.target.value;
        this.setState({ vacation });
    }

    private addVacation = async () => {
        try {
            //getting the new vacation update from the server,
            //because we need vacation with ID and following status, and updating the store.
            const addedVacation = await axios.post<Vacation>("http://34.65.179.31:3001/vacations/", this.state.vacation);
            store.dispatch({ type: ActionType.AddVacation, payload: addedVacation.data });
            //reset the state for the next empty vacation card
            this.setState({ vacation: new Vacation("","","",this.getTodayDate(),this.getTodayDate(),1), isEditing: true, isNewVacation: true })
        }
        catch (e) {
            alert(e.response.data.error);
        }
    }

    private getDateFormatToDisplay = (dateString : string) =>{
        return dateString.slice(8,10) + "/" + dateString.slice(5, 7) + "/" + dateString.slice(0, 4);
    }

    //getting the date of today in the correct format, for the new vacation card
    public getTodayDate = ()=>{
        let todayDate = new Date().toJSON();
        return this.getDateFormatToDisplay(todayDate);
    }

    private getDateFormatForHtmlInputTag = (dateString : string) =>{
        let dateArr = dateString.split("/");
        let retString = dateArr[2]+ "-" +dateArr[1]+ "-" +dateArr[0];
        return retString;
    }

    public render() {
        return (
            <div className="vacationAdmin">
                <div className="icons">
                    <FontAwesomeIcon className="edit" icon={faEdit} onClick={this.edit} />&nbsp;
                    <FontAwesomeIcon className="delete" icon={faTrashAlt} onClick={this.deleteVacation} />
                </div>
                {!this.state.isEditing && 
                <div className="form">
                    destination: {this.state.vacation.destination}
                    <br />
                    description: {this.state.vacation.description}
                    <br />
                    price: {this.state.vacation.price}$
                    <br />
                    start: {this.state.vacation.startDate}
                    <br />
                    end: {this.state.vacation.endDate}
                    <br />
                    followers: {this.state.vacation.followers}
                    <br />
                </div>}


                {this.state.isEditing &&
                    <div className="form">
                        <label htmlFor="destination">Destination:</label>
                        <input type="text" name="destination"
                            value={this.state.vacation.destination} onChange={this.setDestination} />
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" rows={4} cols={30} maxLength={95}
                            value={this.state.vacation.description} onChange={this.setDescription}/>
                        <label htmlFor="price">price(in $):</label>
                        <input type="text" name="price"
                            value={this.state.vacation.price} onChange={this.setPrice} />
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" name="startDate"
                            placeholder="dd/mm/yy" value={this.getDateFormatForHtmlInputTag(this.state.vacation.startDate)} onChange={this.setStartDate}/>
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" name="endDate"
                            placeholder="dd/mm/yy" value={this.getDateFormatForHtmlInputTag(this.state.vacation.endDate)} onChange={this.setEndDate} />
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" name="imageUrl"
                            value={this.state.vacation.imageUrl} onChange={this.setUrl} /><br/>
                        {!this.state.isNewVacation && <input type="button" onClick={this.discardChanges} value="cancel" />}
                        {!this.state.isNewVacation && <input type="button" onClick={this.updateVacation} value="submit" />}
                        {this.state.isNewVacation && <input type="button" onClick={this.addVacation} value="add new vacation" />}
                    </div>}
            </div>
        )
    }
}