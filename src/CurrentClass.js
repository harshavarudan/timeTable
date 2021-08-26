import React from "react";
import getArray from "./courseArray";
import Card from 'react-bootstrap/Card'

function currentTime(){
    let options = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        weekday:'short',
        hour12: false

    };
    return new Intl.DateTimeFormat([], options).format(new Date());
}
function getDay(str){
        let days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        for(let x in days)
            if(str===days[x])
                return x
        return -1;

}

class CurrentClass extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            CurrentClass: {name:"Loading",exists:false},
            NextClass:{name:"Loading",exists:false}
        }
        this.currentCard=this.currentCard.bind(this)
        this.nextCard=this.nextCard.bind(this)
    }
     Card(variant,course,type){

         let link="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        let text;

        let name=course.name;
        if(course.exists) {
            link = course.link;
            text=`( ${course.courseCode} ) , Class Code: ${course.ClassCode}`
        }
        return  ( <Card
            bg={variant.toLowerCase()}
            style={{ width: '35rem',marginLeft:"6%",marginRight:"5%"}}
            className="mb-2">
            <Card.Header style={{fontWeight:"bold",fontFamily:"cursive",margin:"auto"}}>{type}</Card.Header>
            <Card.Body>
                <a style={{color: "whitesmoke"}} href={link} target="_blank" ><Card.Title>{name}</Card.Title></a>
                <Card.Text>
                    <a style={{fontWeight:"400"}}>{text}</a>
                </Card.Text>
            </Card.Body>
        </Card>)

    }
    currentCard(){
        return this.Card('Danger',this.state.CurrentClass,"CURRENT CLASS")
    }
    nextCard(){
        return this.Card('Success',this.state.NextClass,`NEXT CLASS\n ${this.state.NextClass.time!==undefined?`AT ${this.state.NextClass.time}:00 (24 hour format)`:""}` )
    }
    componentDidMount() {
        let temp=currentTime().split(", ")
        let day=getDay(temp[0])
        let hour=parseInt(temp[1],10)
            getArray().then(
            (arr)=> {
                let CurrentClass;
                let NextClass={name:"NO MORE CLASSES BOI",exists:false}
                if(hour>20 ||hour <8)
                    CurrentClass={name:"NO CLASSES RIGHT NOW",exists:false}
                else
                    CurrentClass= arr[hour - 8][day]
                for(let i=hour>=8?hour+1:8;i<20;i++){
                    if(arr[i-8][day].exists){
                        NextClass=arr[i-8][day]
                        NextClass.time=i;
                        break;
                    }
                }
                this.setState({CurrentClass:CurrentClass,NextClass:NextClass})

            }

        )


    }

    render() {
        return (
        <body style={{display: "flex", flexDirection: "row"}}>
            {this.currentCard()}
            {this.nextCard()}
        </body>)
    }

}
export default CurrentClass;
