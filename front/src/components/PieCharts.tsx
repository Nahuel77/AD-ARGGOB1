import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type PieChartProps = {
  data: { name: string; value: number }[];
  description: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4567', '#1FC7D4', '#FF6361', '#66C7F4']; // Colores personalizados

const CustomPieChart: React.FC<PieChartProps> = ({ data, description }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px auto' }}>
      {/* Gráfica de torta */}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
        {description}
      </p>
    </div>
  );
};

export default CustomPieChart;