import React from "react";
import {
  Doughnut
  //   Pie,
  //   Line,
  //   Scatter,
  //   Bar,
  //   HorizontalBar,
  //   Radar,
  //   Polar,
  //   Bubble
} from "react-chartjs-2";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Reports = () => {
  const chartData = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [
          getRandomInt(50, 200),
          getRandomInt(100, 150),
          getRandomInt(150, 250)
        ],
        backgroundColor: ["#CCC", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          responsive: true
        }}
      />
      {/* <Pie data={chartData} />
      <Line data={chartData} />
      <Scatter data={chartData} />
      <Bar data={chartData} />
      <HorizontalBar data={chartData} />
      <Radar data={chartData} />
      <Polar data={chartData} />
      <Bubble data={chartData} /> */}
    </div>
  );
};

export default Reports;
