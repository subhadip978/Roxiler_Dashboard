
import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer,Tooltip,XAxis } from 'recharts';

import './barchart.css'
import './piechart.css'
const BarCharts = ({barChartData}) => {
	console.log(barChartData.data);

  return (
	<div className='mt-20 h-[300px]  w-[600px]  gap-40 border-2 border-[#384256] rounded-lg p-5 m-4'>
		<h4>
		BarChart
			</h4>
		
		<ResponsiveContainer width="100%" height="90%">
        <BarChart width={150} height={40} data={barChartData.data}>	
		<XAxis dataKey="range" />
		 <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
            />	
		<Bar dataKey="count" fill="#8884d8" />
		  </BarChart>
      </ResponsiveContainer>
		


	</div>
  )
}

export default BarCharts