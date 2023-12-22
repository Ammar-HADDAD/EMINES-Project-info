import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function GrapheBar() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Stock 1", "Stock 2", "Stock 3"],
      datasets: [
        {
          label: "Product A",
          data: [10, 25, 45, 30, 50],
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const ctx = chartRef.current.getContext("2d");
    let myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Retournez une fonction de nettoyage pour détruire le graphique lorsqu'il est démonté
    return () => {
      myChart.destroy();
    };
  }, []); // Utilisez un tableau de dépendances vide pour exécuter l'effet une seule fois

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
}

export default GrapheBar;
