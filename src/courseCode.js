import text from './courseCode.txt'
const state={
    str:"loading"
}
const getCourseName=async (code)=> {
   await  fetch(text).then(x => x.text()).then((data) => {
        data = data.trim().split("\n")
        let courseMap=new Map();
        for (let temp in data) {
            let arr = (data[temp].split(" &"));
                courseMap.set(arr[0], arr[1]);
        }
        return courseMap.get(code) === undefined ? "Course name not found" :courseMap.get(code);
    }).then(str=>state.str=str)
        return state.str;
}
export default getCourseName;
