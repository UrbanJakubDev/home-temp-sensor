import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Charts.scss";

const Charts = (props) => {
  const [chartHidden, setChartHidden] = useState(true);
  const [chartHiddenCls, setChartHiddenCls] = useState('hidden');

  const hideIconDown = <FontAwesomeIcon icon={faChevronDown} />;
  const hideIconUp = <FontAwesomeIcon icon={faChevronUp} />;

  const toggleCharts = () =>{
    setChartHidden(!chartHidden)
    setChartHiddenCls(chartHidden? '': 'hidden')
  }

  const dataTemp = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Teplota [°C]",
        data: [22, 23.5, 22, 21, 20, 19],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const dataHumi = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Vlhkost [%",
        data: [42, 43.5, 42, 41, 40, 44],
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
      <div className={"charts-group "+ chartHiddenCls}>
        <Line data={dataTemp} options={options} />
        <Line data={dataHumi} options={options} />
      </div>
    </div>
  );
};

export default Charts;
