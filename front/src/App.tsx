import { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/PieCharts';

function App() {
  const [resultado, setResultado] = useState<number[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/dataGET', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud de datos');
        }

        const result = await response.json();
        setResultado(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
      <h1>Mi Aplicación con Gráfico de Tortas</h1>
      {/* Verificamos si 'resultado' es un arreglo y tiene elementos */}
      {resultado && Array.isArray(resultado) && resultado.length > 0 ? (
        <PieChart data={resultado} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
    </>
  )
}

export default App
