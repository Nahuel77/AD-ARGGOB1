import { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/PieCharts';
import { YearData, FundsData } from './types';

function App() {
  const [projects, setResultado] = useState<YearData[] | null>(null);
  const [funds, setFunds] = useState<FundsData[] | null>(null);

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
        setResultado(result.projects);
        setFunds(result.funds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Financiamiento de proyectos en Argentina</h1>
        <h2>inversión de IDA/IBRD y Fondos Fiduciarios relacionados</h2>
        {projects && projects.length > 0 ? (
          <>
            <PieChart
              data={projects.map((item) => ({
                name: item.fiscal_year.toString(),
                value: item.num_reg,
              }))}
              description="Cantidad de proyectos asignados por año"
            />
          </>
        ) : (
          <p>Cargando datos...</p>
        )}
        {funds && funds.length > 0 ? (
          <PieChart
            data={funds.map((item) => ({
              name: item.fiscal_year.toString(),
              value: item.supplier_contract_amount_usd,
            }))

            }
            description='Fondos recibidos por año (expresados en Usd)' />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </>
  )
}

export default App
