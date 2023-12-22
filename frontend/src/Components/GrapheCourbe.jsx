import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function GrapheCourbe() {
 const chartRef = useRef(null);

 useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Product A',
          data: [10, 25, 45, 30, 50],
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          fill: false, // Utilisez false pour éviter de remplir le graphique avec des lignes ou des points
        },
        {
          label: 'Product B',
          data: [20, 35, 65, 40, 70],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false, // Utilisez false pour éviter de remplir le graphique avec des lignes ou des points
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const ctx = chartRef.current.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
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

export default GrapheCourbe;