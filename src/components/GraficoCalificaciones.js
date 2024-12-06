// src/components/GraficoCalificaciones.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const GraficoCalificaciones = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  useEffect(() => {
    axios.get('https://alex.starcode.com.mx/apiAlumnos.php')
      .then(response => {
        setAlumnos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los datos de la API", error);
        setLoading(false);
      });
  }, []);

  // Generar los datos de la gráfica
  const obtenerDatosGraficos = (practicas) => {
    const labels = Object.keys(practicas); // Obtener los nombres de las prácticas
    const data = Object.values(practicas); // Obtener las calificaciones

    return {
      labels,
      datasets: [
        {
          label: 'Calificaciones de Prácticas',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  // Calcular el promedio de las calificaciones
  const calcularPromedio = (practicas) => {
    const total = Object.values(practicas).reduce((sum, calificacion) => sum + parseFloat(calificacion), 0);
    return total / Object.values(practicas).length;
  };

  return (
    <div>
      <h2>Gráficas de Calificaciones y Promedios</h2>
      {loading ? <p>Cargando datos...</p> :
        alumnos.map((alumno, index) => (
          <div key={index}>
            <h3>{alumno.nombre}</h3>
            <Line data={obtenerDatosGraficos(alumno.practicas)} />
            <p>Promedio: {calcularPromedio(alumno.practicas).toFixed(2)}</p>
          </div>
        ))
      }
    </div>
  );
};

export default GraficoCalificaciones;
