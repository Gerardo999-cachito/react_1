import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Clientecito = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost/apiprueba/api.php');
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
                backgroundColor: ['#4bc0c0', '#36a2eb', '#ffcd56', '#ff6384'],
            },
        ],
    };

    // Datos para la gráfica de sexo (M y F)
    const sexoData = {
        labels: ['M', 'F'],
        datasets: [
            {
                label: 'Número de Docentes',
                data: [
                    docentes.filter((docente) => docente.sexo === 'M').length,
                    docentes.filter((docente) => docente.sexo === 'F').length,
                ],
                backgroundColor: ['#36a2eb', '#ff6384'],
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className="App-link">Gráfica de IDs de Docentes</h1>
            <Bar data={nombresData} options={{ responsive: true }} />

            <h1 className="App-link" style={{ marginTop: '40px' }}>Gráfica de Docentes por Género</h1>
            <Bar data={sexoData} options={{ responsive: true }} />
        </div>
    );
};

export default Clientecito;
