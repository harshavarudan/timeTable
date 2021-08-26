import React from "react";
import courseArray from "./courseArray";
import Table from 'react-bootstrap/Table'
class TimeTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={loading:true};
        this.renderTable=this.renderTable.bind(this);
    }
    componentDidMount() {
        courseArray().then(arr=>this.setState({arr:arr,loading:false}))
    }
    renderTable(){
        let dayEnd=5;
        if(this.state.loading)return<body>Timetable is Loading</body>
        let days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"].slice(0,dayEnd)
        let heading=days.map(days=><th>{days}</th>)
        let time=[];
        for(let i=8;i<20;i++)
            time.push(<td>{`${i}:00 - ${i+1}:00`}</td>)
        let body=[]
        for(let i=0;i<time.length;i++){
            let temp=(
                <tr>
                <td>{time[i]}</td>
                    {this.state.arr[i].map(course=> {
                    if(!course.exists)return <td></td>;
                    return(
                        <td>
                        <a href={course.link}  target="_blank" tabIndex={-1} class={"row-link"} style={{color:"darkred" ,fontFamily:"cursive"} }>
                            {`${course.name.substring(0, course.name.lastIndexOf(" "))} (${course.courseCode})`}
                        </a>
                    </td>)}).slice(0,dayEnd)}
            </tr>)
            body.push(temp)
        }
    return (
        <Table striped bordered hover size="sm" style={{margin:"auto"}}>
            <thead>
            <th>#</th>
            {heading}
            </thead>
            <tbody>
            {body}
            </tbody>
        </Table>
    )
    }
    render(){
        return(
            <div>
                {this.renderTable()}
            </div>
        )

    }


}
export default TimeTable
