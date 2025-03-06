import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [30, 45, 60, 75, 90, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "New Pets",
        data: [20, 35, 50, 70, 85, 95],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
