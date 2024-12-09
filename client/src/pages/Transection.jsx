import React, { useEffect,useState } from 'react'
import { IoMdDoneAll } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios'





const Transection = () => {
	const[page,setPage]=useState(1);
	const [transections,setTransections]=useState([]);

	const[search,setSearch]=useState("");

const fetchData=async()=>{
	

	const {data}=await  axios.get(`/api/v1/product/transection?page=${page}&search=${search}`);
	console.log(data);
	setTransections(data);

}




const changeHandler=()=>{
	console.log(page)	
	setPage(page+1)
	console.log(page)
}

const changeDecreaseHandler=()=>{
	if(page<1){
		return ;
	}  
	setPage(page-1)
}

useEffect(()=>{
	
	console.log(page)	
fetchData()
},[page])


  return (
	<div className='bg-[#2a3447] min-h-screen'>
		<div className='flex  justify-center p-2 gap-3'>

		<input type="text" name="" id="" 
		className='rounded-lg w-80'
		onChange={(e)=>setSearch(e.target.value)}/>
<button onClick={()=>fetchData()} className='p-1 border-2 rounded-lg border-purple-600'>
	search
</button>
		</div>


		<table className='w-full  '>
			<tr>
				<th className='p-3 text-sm font-semibol text-left text-white'>id</th>
				<th className='p-3 text-sm font-semibol text-left text-white'>Title</th>
				<th className='p-3 text-sm font-semibol text-left text-white'>Description</th>
				<th className='p-3 text-sm font-semibol text-left text-white'>Price</th>
				<th className='p-3 text-sm font-semibol text-left text-white'>Category</th>
				<th className='p-3 text-sm font-semibol text-left text-white'>Sold</th>
				
			</tr>

			{transections?.data?.length>0 ?  transections.data.map((i)=>(		
			<tr key={i.id}>
				<td className='p-3 text-white text-sm text-grey-700'>{i.id}</td>
				<td className='p-3 text-white text-sm text-grey-700'>{i.title}</td>
				<td className='p-3 text-white text-sm text-grey-700'>{i.description}</td>
				<td className='p-3 text-white text-sm text-grey-700'>{i.price}</td>
				<td className='p-3 text-white text-sm text-grey-700'>{i.category}</td>
				<td className='p-3 text-white text-sm text-grey-700'>
					{i.sold?<TiDeleteOutline />:<IoMdDoneAll />

			}
					</td>
				
			</tr>
			)):(
				<>
				No transactions
				</>
			
			)
}

		</table>

		<div className='flex gap-3'>
			<button className=''
			onClick={changeHandler}
			>
				next
			</button>
			<button className=''
			onClick={changeDecreaseHandler}
			
			>
				previous
			</button>
		</div>
	</div>
  )
}

export default Transection