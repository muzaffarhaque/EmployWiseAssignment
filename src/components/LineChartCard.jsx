import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const LineChartCard = ({color='', info=[50, 150, 100, 200, 180, 250]}) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: info || [50, 150, 100, 200, 180, 250], 
        borderColor:color || "#FFC107", 
        backgroundColor: gradient ? gradient : "rgba(255, 193, 7, 0.2)", 
        borderWidth: 2,
        tension: 0.4, 
        fill: true,
        pointRadius: 0, 
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
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  return (
   
        <Line ref={chartRef} data={data} options={options} />
        
  );
};

export default LineChartCard;
