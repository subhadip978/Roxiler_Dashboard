import React, { useEffect, useState } from 'react'
import BarCharts from '../components/BarChart'
import axios from 'axios'
import PieCharts from '../components/PieCharts';
import './home.css'
import { Link } from 'react-router-dom';
import Statistics from '../components/Statistics';



const Home = () => {
	const [date,setDate]=useState(null);
	const [bardata,setbarData]=useState([]);
	
	const [statsData,setStatsData]=useState([]);
	const [pieData,setPieData]=useState([]);

	const barChartHandler=async(date)=>{
		if(!date){
			return ;
		} 		
	const selectedDate = new Date(date); 
    const month = selectedDate.getMonth() + 1; 
    const year = selectedDate.getFullYear();

		const {data}=await axios.get(`/api/v1/product/barchart?month=${month}&year=${year}`);

		setbarData(data);
		console.log(data);
	}



	const statsHandler=async()=>{
		if(!date){
			return ;
		} 		
	const selectedDate = new Date(date); 
    const month = selectedDate.getMonth() + 1; 
    const year = selectedDate.getFullYear();

		const {data}=await axios.get(`/api/v1/product/stats?month=${month}&year=${year}`);

		// console.log(data);
		setStatsData(data);

	}

	const pieChartHandler=async()=>{
		if(!date){
			return ;
		} 		
	const selectedDate = new Date(date); 
    const month = selectedDate.getMonth() + 1; 
    const year = selectedDate.getFullYear();

		const {data}=await  axios.get(`/api/v1/product/piechart?month=${month}`)
		console.log(data);
		setPieData(data);
		
	}

	 useEffect(()=>{
		 barChartHandler(date)
		 statsHandler(date)
		 pieChartHandler(date)
		//  setDate();
	 },[date])


  return (
	<div className='bg-[#2a3447] min-h-screen'>
		<nav className='bg-slate-800 text-white font-semibold flex justify-center p-3'>
			<Link to="/transection">
			Transection			
			</Link>
		</nav>
	
<div className='flex flex-col justify-center  text-white'>
		 
<div style={{textAlign:'center' }}>
		<input className="p-2.5 rounded-md border border-gray-300  text-base mb-2.5 text-black w-96 mt-8"
		 type="date" 
		 name="" 
		 id=""  
		 onChange={(e)=>setDate(e.target.value)}/>
</div>

<div className="flex flex-wrap flex-row gap-10 h-full">
	
		<BarCharts barChartData={bardata}/>
		 <PieCharts pieChartData={pieData}/>
</div>

        <Statistics  statsTableData={statsData} /> 

	</div>
	</div>
  )
}

export default Home