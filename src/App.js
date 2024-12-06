// src/App.js
import React from 'react';
import './App.css';  // Asegúrate de que el archivo de estilos esté presente si deseas personalizar los estilos
import GraficoCalificaciones from './components/GraficoCalificaciones'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Proyecto React: Gráficas de Calificaciones</h1>
      </header>
      <main>
        <GraficoCalificaciones />
      </main>
    </div>
  );
}

export default App;
