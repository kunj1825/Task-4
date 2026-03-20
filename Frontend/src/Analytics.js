import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/analytics").then(res => setData(res.data));
  }, []);

  const productiveSites = ["github.com", "stackoverflow.com", "leetcode.com"];
  const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

  let productive = 0, unproductive = 0;
  data.forEach(log => {
    if (productiveSites.some(s => log.url.includes(s))) productive += log.duration;
    else if (unproductiveSites.some(s => log.url.includes(s))) unproductive += log.duration;
  });

  const chartData = {
    labels: ["Productive", "Unproductive"],
    datasets: [{ data: [productive, unproductive], backgroundColor: ["#2ecc71", "#e74c3c"] }]
  };

  const options = { 
    responsive: true, 
    maintainAspectRatio: false, // allows custom sizing 
    }; 
  return (
    <div className="analytics-container"> 
      <Pie data={chartData} options={options} /> 
    </div> );
}
