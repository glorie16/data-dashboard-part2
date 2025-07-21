import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PetCharts = ({ pets }) => {
  // chart 1:pet type bar chart
  const typeCounts = pets.reduce((acc, pet) => {
    acc[pet.type] = (acc[pet.type] || 0) + 1;
    return acc;
  }, {});
  const typeChartData = Object.entries(typeCounts).map(([type, count]) => ({
    category: type,
    count
  }));

  // chart 2: age type pie chart
  const ageCounts = pets.reduce((acc, pet) => {
    acc[pet.age] = (acc[pet.age] || 0) + 1;
    return acc;
  }, {});
  const ageChartData = Object.entries(ageCounts).map(([age, count]) => ({
    name: age,
    value: count
  }));

  return (
    <div className="charts">
      <h3>Pet Count by Type</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={typeChartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3>Pet Age Distribution</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={ageChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {ageChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PetCharts;