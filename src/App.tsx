import React, { useState, useEffect } from "react";
import "./App.css";
import { ThingSpeakResponse } from "./sensor.model";
import Sensor from "./components/Sensor/Sensor";
const axios = require("axios").default;

const App: React.FC = () => {
  // Sensor Data
  const [apiData, setApiData] = useState<ThingSpeakResponse>();
  const [apiDataHistory, setApiDataHistory] = useState<ThingSpeakResponse>();

  useEffect(() => {
    // get Data frist time
    getFromThingSpeak();
    getFromThingSpeakHistory();

    // Get data every 30s
    const interval = setInterval(() => {
      getFromThingSpeak();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Thingspeak handler
  const getFromThingSpeak = () => {
    axios
      .get("https://api.thingspeak.com/channels/318641/feeds.json?results=1")
      .then(function (response: any) {
        // handle success
        setApiData(response.data);
        
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
      .then(function () {});
  };
  
  // Thingspeak handler
  const getFromThingSpeakHistory = () => {
    axios
      .get("https://api.thingspeak.com/channels/318641/feeds.json?results=6")
      .then(function (response: any) {
        // handle success
        setApiDataHistory(response.data);
        
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
      .then(function () {});
  };



  const refreshHandler = () => {
    getFromThingSpeak();
  };

  return (
    <div className="App">
      <header className="App-header">
        <Sensor data={apiData} historyData={apiDataHistory} onRefreshData={refreshHandler} />
      </header>
    </div>
  );
};

export default App;
