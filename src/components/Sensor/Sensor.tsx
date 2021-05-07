import React from "react";
import "./Sensor.scss";
import { ThingSpeakResponse } from "../../sensor.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data?: ThingSpeakResponse;
  onRefreshData: () => void;
}

const Sensor = (props: Props) => {
  const element = <FontAwesomeIcon icon={faSyncAlt} />;

  const roundValues = (value: string | any) => {
    let valNum = parseFloat(value);
    let roundedNum = valNum.toFixed(1);
    let strNum = roundedNum.toString();
    return strNum;
  };

  // Beautify Date handler + Set UTC to locall time
  const beautifyDate = (data: string | any) => {

    const twoDigits = (value:number) => {
      return (value < 10 ? '0': '') + value
      
    }

    if (data){
      const date = new Date(data)
      let year = date.getFullYear()
      let month = twoDigits(date.getMonth())
      let day = twoDigits(date.getDay())
      let hour = twoDigits(date.getHours())
      let minute = twoDigits(date.getMinutes())
      let beautyDate = `${year}-${month}-${day} ${hour}:${minute}`
      return beautyDate
    }

      return '--'
  };

  const channel = props.data?.channel;
  const values = props.data?.feeds[0];
  const sensorName = channel?.field1.substr(5, channel.field1.length);

  let tempVal = roundValues(values?.field1);
  let humiVal = roundValues(values?.field2);
  let timeVal = beautifyDate(values?.created_at);

  return (
    <div className="widget-container">
      <div className="sensor-info">
        <div className="info-container">
          <h4>{sensorName}</h4>
          <span className="datetime">{timeVal ? timeVal : "--"}</span>
        </div>
        <div className="setup-container">
          <div className="setup" onClick={props.onRefreshData}>
            {element}
          </div>
        </div>
      </div>
      <div className="values-container">
        <div className="temp-widget widget">
          <h4>Teplota</h4>
          <div className="temp-value">{tempVal ? tempVal : "--"}</div>
        </div>
        <div className="humidity-widget widget">
          <h4>Vlhkost</h4>
          <div className="humidity-value">{humiVal ? humiVal : "--"}</div>
        </div>
      </div>
      {/* <div className='sensor-info'>more</div> */}
    </div>
  );
};

export default Sensor;
