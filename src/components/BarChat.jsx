import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";  
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";  

ChartJS.register(BarElement, CategoryScale, LinearScale);  

const BarChart = ({ info = Array(28).fill().map(() => Math.random() * 100)}) => {  
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  
  const labels = Array.from({ length: 28 }, (_, index) => (index + 1).toString());

  const backgroundColors = Array.from({ length: 28 }, (_, index) => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 0.2)`; 
  });

  const borderColors = Array.from({ length: 28 }, (_, index) => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 1)`; 
  });

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 180);
      gradientFill.addColorStop(0, "rgba(255, 193, 7, 0.4)"); 
      gradientFill.addColorStop(1, "rgba(255, 193, 7, .1)");   
      setGradient(gradientFill);
    }
  }, []);

  const data = {
    labels: labels,  
    datasets: [
      {
        data: info,  
        backgroundColor: borderColors|| backgroundColors, 
        borderColor: borderColors,  
        borderWidth: 0,
        barPercentage: .7,
        categoryPercentage: .7,
     
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: true, grid: { display: false } },
      y: { display: true, grid: { display: false } },
    },
  };

  return (
    <Bar ref={chartRef} data={data} options={options} />
  );
};

export default BarChart;
