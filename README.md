# AD-ARGGOB1
Análisis de datos sobre la adjudicación de Contratos en financiamiento de proyectos de inversión - Proyectos en Argentina

Proposito general: Mostrar un analisis de datos, realizando diferentes tecnologías.

Este conjunto de adjudicaciones de contratos incluye datos sobre compromisos vinculados a contratos que fueron revisados por el Banco antes de ser adjudicados (contratos financiados por el Banco con revisión previa) en el marco de proyectos de inversión de la AIF/BIRF y los Fondos Fiduciarios relacionados. Este conjunto de datos no lista todos los contratos adjudicados por el Banco y debe considerarse únicamente como una guía para determinar la distribución de los principales compromisos contractuales entre los países miembros del Banco. El término "País/Economía del Proveedor" representa el lugar de registro del proveedor, que puede o no coincidir con el país de origen real del proveedor. La información no incluye adjudicaciones a subcontratistas ni contempla el cofinanciamiento. El Grupo de Políticas y Servicios de Adquisiciones no garantiza la precisión de los datos incluidos en esta publicación y no asume responsabilidad alguna por las consecuencias derivadas de su uso. El Banco Mundial cumple con todas las sanciones aplicables a las transacciones del Banco Mundial.

API consumida para la obtención de datos: https://financesone.worldbank.org/api-explorer?id=DS01129

Tecnologías usadas:

* Back
  - Python
    + Flask
    + Pandas
* Front
  - Node
    + Vite + React
    + PieChart

```tsx
import { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/PieCharts';
import BarChart from './components/BarCharts'; // Si tienes un componente de BarChart
import { YearData, FundsData } from './types';

function App() {
  const [projects, setProjects] = useState<YearData[] | null>(null);
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
        setProjects(result.df_project_year);  // Asume que el backend devuelve estos campos
        setFunds(result.df_founds_year);      // Similar para los fondos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ margin: '0 20px' }}>
        <h1>Financiamiento de proyectos en Argentina</h1>
        <h2>Inversión de IDA/IBRD y Fondos Fiduciarios relacionados</h2>
        
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

      <div style={{ margin: '0 20px' }}>
        {funds && funds.length > 0 ? (
          <BarChart
            data={funds.map((item) => ({
              name: item.fiscal_year.toString(),
              value: item.supplier_contract_amount_usd,
            }))}
            description="Fondos recibidos por año (expresados en USD)"
          />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

export default App;```