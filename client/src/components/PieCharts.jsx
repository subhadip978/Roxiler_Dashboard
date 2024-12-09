import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Tooltip } from 'recharts'; 
import './piechart.css'
 
const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieCharts = ({pieChartData}) => {
	console.log(pieChartData);

  return(
	<div className='w-[800px]  mt-20  p-5 m-4 border-2 rounded-lg border-[#384256] h-[300px] flex justify-center items-center '>
    <h1>PIECHART</h1>
		
		 <ResponsiveContainer width="100%" height="90%">
        <PieChart width={400} height={400}>
		<Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
             
            />	
          <Pie
            data={pieChartData.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
			 
             {data.map((entry,index) => (
				<Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]} />
				))} 
           </Pie>
        </PieChart>
      </ResponsiveContainer> 
	  <div className="w-2/3 bg-slate-700">
        {pieChartData?.data?.map((item,index) => (
          <div className="bg-slate-700 rounded-lg p-2 w-full" key={index}>
            <div className=" flex justify-between space-y-2 rounded-lg w-full">
				

              <div className="w-[42px] h-10" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
				
			 

			 <div className='flex gap-2 p-1   w-full'>

              <span>{item.category}</span>
            <span>{item.count}</span>
			 </div>
            </div>
          </div>
        ))}
      </div>
	 


	
	</div>
  )
}

export default PieCharts
