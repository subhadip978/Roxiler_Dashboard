import React, { useState } from 'react'

const Statistics = ({statsTableData}) => {
	

	// const [statsData,setStatsData]=useState();

console.log(statsTableData)
// 	const fetchData=async()=>{


// const selectedDate = new Date(date); // Convert to Date object
//     const month = selectedDate.getMonth() + 1; 
//     const year = selectedDate.getFullYear();
// 		const {data}=await  axios.get(`/api/v1/product/stats?month=${month}&year=${year}`);
// 		console.log(data);
		
// 		setStatsData(data);
// 	}
	

  return (

	  
	  <div className='flex justify-center '>




{statsTableData?.stats?.length>0 ? statsTableData.stats.map((i,index)=>

		<div className='flex  justify-center p-2 gap-3 flex-col space-y-6 bg-slate-800  rounded-lg outline-none w-2/4 items-center ' key={index}>

<div className='flex gap-8 '>
		<span className=''>Total sale</span>
		<span>1000</span>
</div>
<div  className='flex gap-8'>
		<span>Total sold item</span>
		<span>55</span>
</div>
<div className='flex gap-8'>

		<span>Total not sold</span>
		<span>15</span>
</div>


	</div>
):(
	<>
	
	no data</>
) }

	</div>
  )
}

export default Statistics