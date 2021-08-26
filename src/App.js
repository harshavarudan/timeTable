import './App.css';
import CurrentClass from "./CurrentClass";
import React from "react";
import TimeTable from "./TimeTable";
function App() {
  return (

      <div >
        <div className="App" style={{ border: "1%",padding: "40px",marginBottom: "10px",display:"flex",margin:"auto"}}>
            <CurrentClass/>
        </div>

          <div style={{ padding: "3%",margin:"auto"}}>
              <TimeTable/>
          </div>

    </div>
  );
}

export default App;
