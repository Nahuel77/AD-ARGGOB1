import { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/PieCharts';
import BarChart from './components/BarCharts';
import BarChartAlter from './components/BarChartsAlter';
import { YearData, FundsData, PracticeData, PracticeFunds } from './types';

function App() {
  const [projects, setResultado] = useState<YearData[] | null>(null);
  const [funds, setFunds] = useState<FundsData[] | null>(null);
  const [practice, setPractice] = useState<PracticeData[] | null>(null);
  const [practice_f, setPracticeFunds] = useState<PracticeFunds[] | null>(null);

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
        setPractice(result.practice);
        setPracticeFunds(result.practice_f);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Financiamiento de proyectos en Argentina</h1>
      <h2>Inversión de IDA/IBRD y Fondos Fiduciarios relacionados</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '0 50px' }}>
          {projects && projects.length > 0 ? (
            <PieChart
              data={projects.map((item) => ({
                name: item.fiscal_year.toString(),
                value: item.num_reg,
              }))}
              description="Cantidad de proyectos asignados por año"
            />
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>

        <div style={{ margin: '0 50px' }}>
          {funds && funds.length > 0 ? (
            <BarChart
              data={funds.map((item) => ({
                name: item.fiscal_year.toString(),
                value: item.supplier_contract_amount_usd,
              }))}
              description="Fondos recibidos por año (expresados en millones USD)"
            />
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '0 50px' }}>
          {practice && practice.length > 0 ? (
            <PieChart
              data={practice.map((item) => ({
                name: item.procurement_category,
                value: item.num_projects,
              }))}
              description="Cantidad de proyectos por categoría"
            />
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
        <div style={{ margin: '0 50px' }}>
          {practice_f && practice_f.length > 0 ? (
            <BarChartAlter
              data={practice_f.map((item) => ({
                name: item.procurement_category,
                value: item.supplier_contract_amount_usd,
              }))}
              description="Fondos recibidos por categoría (expresados en millones USD)"
            />
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
