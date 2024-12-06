import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Clientecito = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
            const data = await response.json();
            setDocentes(data);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000); // Actualizar cada 5 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    // Datos para la gráfica de nombres
    const nombresData = {
        labels: docentes.map((docente) => docente.nombre),
        datasets: [
            {
                label: 'IDs de Docentes',
                data: docentes.map((docente) => docente.id),
                backgroundColor: [
                    '#36a2eb', '#ffcd56', '#ff6384', '#4bc0c0', '#ff9f40', // Colores distintos
                    '#4b77be', '#f39c12', '#1abc9c', '#9b59b6', '#34495e'
                ],
            },
        ],
    };

    // Datos para la gráfica circular de sexo (M y F)
    const sexoData = {
        labels: ['M', 'F'],
        datasets: [
            {
                label: 'Número de Docentes',
                data: [
                    docentes.filter((docente) => docente.sexo === 'M').length,
                    docentes.filter((docente) => docente.sexo === 'F').length,
                ],
                backgroundColor: ['#1abc9c', '#f39c12'], // Colores distintos para M y F
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className="App-link" style={{ color: 'black' }}>Gráfica de IDs de Docentes</h1>
            <Bar data={nombresData} options={{ responsive: true }} />

            <h1 className="App-link" style={{ marginTop: '40px', color: 'black' }}>Gráfica de Docentes por Género</h1>
            <Pie 
                data={sexoData} 
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                }} 
                height={100} // Tamaño de la gráfica (ajustado)
                width={100}  // Tamaño de la gráfica (ajustado)
            />
        </div>
    );
};

export default Clientecito;
