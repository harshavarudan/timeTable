import courseCode from "./courseCode";
import tt from "./timetable.txt"
class CourseClass{
    constructor(data) {
        if( data==="TEMP" ){this.exists=false;this.name="NO CLASSES RIGHT NOW";return;}
       else this.exists=true
        this.link="UNDECIDED";
        data=data.split("\n")
        this.courseCode=data[0].trim();
        this.ClassCode=data[1].trim();
        this.timings=data.slice(2).join('')

    }
}
function type(str){
    str=str.charAt(0)
    switch(str){
        case "L":
            return " Lecture"
        case "T":
            return " Tutorial"
        case "P":
            return " Lab"
        default :
            return " SOME CLASS"
    }
}
function getDay(str){
    let days=["Mo","Tu","We","Th","Fr","Sa","Su"];
    for(let x in days)
        if(str===days[x])
            return x
    return -1;
}
function getHours(data){

    data=data.split("\n")

    let array=[]
    for(let i =0;i<data.length;i+=2){
        let temp=data[i].split(":");
        let endHour=parseInt( temp[1].charAt(temp[1].length-1),10)
        temp=temp[0].split(" ");
        let hour=parseInt( temp[1],10);
        hour = hour >= 8 ? hour - 8 : hour + 4;
        endHour=endHour>=8?endHour-8:endHour+4;
        while(hour<=endHour){
            for (let j = 0; j < temp[0].length; j += 2) {
                let ch = temp[0].charAt(j) + temp[0].charAt(j + 1);
                array.push([hour, getDay(ch), data[i + 1]])
            }
            hour++;

    }
    }


    return array;
}
async function getArray(){
    let courseArray=[]
    for(let i =0;i<12;i++){
        let temp=[]
        for(let j=0;j<=6;j++){
            temp.push(new CourseClass("TEMP"))
        }
        courseArray.push(temp)
    }

    await fetch(tt).then(x=>x.text()).then(
        async (data)=>{
            data=data.trim().split("\n\n")

            for(let i in data) {
                let temp = new CourseClass(data[i])
                let arr= getHours(temp.timings)
                for(let j in arr){
                    courseArray[arr[j][0]][arr[j][1]]=new CourseClass(data[i]);
                    courseArray[arr[j][0]][arr[j][1]].link=arr[j][2]==="Room  TBA"?"NO LINK":arr[j][2];
                    courseArray[arr[j][0]][arr[j][1]].exists=true;
                  await  courseCode(courseArray[arr[j][0]][arr[j][1]].courseCode.split("-")[0]).then(x=>courseArray[arr[j][0]][arr[j][1]].name=x.trim()+type(courseArray[arr[j][0]][arr[j][1]].courseCode.split("-")[1]))
                }
            }
        }
    )
    return courseArray;

}
export default getArray;
