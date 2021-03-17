import { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { store } from '../../redux/store';


export default class Charts extends Component<any> {
    public componentDidMount(){
        this.adminValidation();
    }

    private adminValidation = () =>{
        if (store.getState().userType === "CUSTOMER"){
            this.props.history.push("/vacations");
        }
        if (store.getState().userType === ""){
            this.props.history.push("/login");
        }
    }
    private getVacationDataForChart = () => {
        let vacationsArr = store.getState().vacations;
        let vacationsDataArr = [];
        for (let i = 0; i < vacationsArr.length; i++) {
            let vac = vacationsArr[i];
            vacationsDataArr.push({ vacation: vac.destination, followers: vac.followers });
        }
        return vacationsDataArr;
    }

    private vacations = this.getVacationDataForChart();

    private getTickValues = ()=>{
        let retArr = [];
        for(let i = 0;i<this.vacations.length;i++){
            retArr.push(i+1);
        }
        return retArr;
    }

    private getTickFormat = ()=>{
        let retArr = [];
        for(let i = 0;i<this.vacations.length;i++){
            retArr.push(this.vacations[i].vacation);
        }
        return retArr;
    }

    render() {
        return (
            <VictoryChart domainPadding={25}>
                <VictoryAxis
                    style={{
                        tickLabels: {
                          fontSize: 8
                        }
                      }}
                    tickValues={this.getTickValues()}
                    tickFormat={this.getTickFormat()}
                />
                <VictoryAxis
                    dependentAxis
                    label="followers"
                    tickFormat={(x) => (x)}
                />
                <VictoryBar
                    data={this.vacations}
                    x="vacation"
                    y="followers"
                />
            </VictoryChart>
        )
    }
}
