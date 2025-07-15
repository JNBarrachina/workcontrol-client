import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

const SimplePieChart = ({ data }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value, name, props) => [`${value} h`, name]} />
      <Legend />
    </PieChart>
  );
};

export { SimplePieChart };