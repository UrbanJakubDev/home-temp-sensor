import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Charts.scss";

const Charts = (props) => {
  const [chartHidden, setChartHidden] = useState(true);
  const [chartHiddenCls, setChartHiddenCls] = useState("hidden");
  const [chartData, setChartData] = useState(null);
  const [chartTempData, setChartTempData] = useState(null);
  const [chartHumiData, setChartHumiData] = useState(null);
  const [chartTimeAxisValues, setChartTimeAxisValues] = useState(null);

  // FA Icons
  const hideIconDown = <FontAwesomeIcon icon={faChevronDown} />;
  const hideIconUp = <FontAwesomeIcon icon={faChevronUp} />;

  const extractTempData = (data) => {
    let result = data.map((a) => a.field1);
    return result;
  };

  const extractHumiData = (data) => {
    let result = data.map((a) => a.field2);
    return result;
  };

  const extractTimeAxis = (data) => {
    const getDate = (val) => {

      const twoDigits = (value) => {
        return (value < 10 ? "0" : "") + value;
      };

      let data = val.toString();
      const date = new Date(data);
      
      let hour = twoDigits(date.getHours());
      let minute = twoDigits(date.getMinutes());
      let beautyDate = `${hour}:${minute}`;

      return beautyDate;
    };

    let newArray = data.map((a) => getDate(a.created_at));
    return newArray
  };

  // Toogle Charts switch
  const toggleCharts = () => {
    setChartHidden(!chartHidden);
    setChartHiddenCls(chartHidden ? "" : "hidden");

    // Load data from props
    let data = props.data.feeds;
    setChartData(data);
    setChartTempData(extractTempData(data));
    setChartHumiData(extractHumiData(data));
    setChartTimeAxisValues(extractTimeAxis(data));
  };

  // Charts Data
  const dataTemp = {
    labels: chartTimeAxisValues,
    datasets: [
      {
        label: "Teplota [°C]",
        data: chartTempData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const dataHumi = {
    labels: chartTimeAxisValues,
    datasets: [
      {
        label: "Vlhkost [%",
        data: chartHumiData,
        fill: false,
        backgroundColor: "rgb(94, 70, 202)",
        borderColor: "rgba(94, 70, 202, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="charts-group-wrapper">
      <div className="charts-hide-icon" onClick={toggleCharts}>
        {chartHidden ? hideIconDown : hideIconUp}
      </div>
      <div className={"charts-group " + chartHiddenCls}>
        <Line data={dataTemp} options={options} />
        <Line data={dataHumi} options={options} />
      </div>
    </div>
  );
};

export default Charts;
