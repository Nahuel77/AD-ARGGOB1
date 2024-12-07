import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

type BarChartProps = {
    data: { name: string; value: number }[];
    description: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4567', '#1FC7D4', '#FF6361', '#66C7F4']; // Colores personalizados

const formatCurrency = (value: number) => {
    return (value / 1000000).toFixed(1) + 'M';
};

const CustomBarChart: React.FC<BarChartProps> = ({ data, description }) => {
    return (
        <div style={{ textAlign: 'center', margin: '20px auto' }}>
            <p style={{ marginTop: '20px', fontSize: '1.5rem', color: '#999' }}>
                {description}
            </p>
            <ResponsiveContainer width="100%" height={450}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="2 4" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="value" fill="#8884d8">
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;