import { Sequelize,Op } from "sequelize";
import { Product } from "../models/product.model.js";

export const statistic=async(req,res)=>{


	const { year, month } = req.query;
	console.log(year);
	console.log(month);

	if (!year || !month) {
		return res.status(400).json({ error: "Please provide year and month as query parameters." });
	  }

	
	

	const stats = await Product.findAll({
	 attributes: [
         [Sequelize.fn("SUM", Sequelize.literal("CASE WHEN sold THEN price ELSE 0 END")), "totalSaleAmount"],
         [Sequelize.fn("COUNT", Sequelize.literal("CASE WHEN sold THEN 1 ELSE NULL END")), "totalSoldItems"],
         [Sequelize.fn("COUNT", Sequelize.literal("CASE WHEN NOT sold THEN 1 ELSE NULL END")), "totalNotSoldItems"],
       ],
	  where: {
		[Op.and]:[ Sequelize.where(
			Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM dateOfSale')), 
			parseInt(month)
		  ),
		  Sequelize.where(				
			Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM dateOfSale')), 
			parseInt(year)
		  ),
		  ]
		}
    });



	res.status(200).json({
		
		
		stats
	  });

}




export const barChart = async (req, res) => {
	try {
	  const { month ,year} = req.query;
	  const priceRanges = [
		{ min: 0, max: 100 },
		{ min: 100, max: 200 },
		{ min: 200, max: 300 },
		{ min: 300, max: 500 },
		{ min: 500, max: 600 },
		{ min: 600, max: 1000 },
	  ];
  
	  const barChartData = await Promise.all(
		priceRanges.map(async (range) => {
		  const count = await Product.count({
			where: {
			  price: {
				[Op.gte]: range.min,
				[Op.lt]: range.max
			  },
			  
			  [Op.and]:[ Sequelize.where(
				Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM dateOfSale')), 
				parseInt(month)
			  ),
			  Sequelize.where(				
				Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM dateOfSale')), 
				parseInt(year)
			  ),
			  ]
			}
		  });
  
		  return {
			range: `${range.min} - ${range.max}`,
			count,
		  };
		})
	  );
  
	  res.status(200).json({ data: barChartData });
	} catch (err) {
	  console.log("ERROR||", err);
	  res.status(500).json({ error: err.message });
	}
  };






export const pieChart = async (req, res) => {
  try {
	const { month, year } = req.query;
    

    const pieChartData = await Product.findAll({
      attributes: [
        "category",
        [Sequelize.fn("COUNT", Sequelize.col("category")), "count"],
      ],
	     where: Sequelize.where(
		      Sequelize.fn("EXTRACT", Sequelize.literal("MONTH FROM dateOfSale")),
			  parseInt(month)
		     ),
	
	  
	group: ["category"], 

});

   

    res.status(200).json({success:true, data: pieChartData });
  } catch (err) {
    console.error("ERROR||", err);
    res.status(500).json({ error: err.message });
  }
};



export const transection=async(req,res)=>{
	try{
		const {page, search }=req.query;
		console.log(search)
		
		const currentPage = parseInt(page, 10) || 1;
  
		const limit = 10; 
		const offset = (currentPage - 1) * limit;
		const products=await Product.findAll({
			where:
			{
				[Op.or]: [
					{ title: { [Op.like]: `%${search}%` } },
					{ description: { [Op.like]: `%${search}%` } },
					{ price: { [Op.like]: `%${search}%` } },
				  ],
	
			},
			
			limit,
			offset
		})	
		res.status(200).json({success:true,data:products});
	}
	catch(err){
		console.log(err)
		res.status(404).json(err.message)
	}
}


export const getAllChartData = async (req, res) => {
	try {

	 
		const { month, year } = req.query;
	  console.log(process.env.DB_USERNAME) 
	  const barChartResponse = await fetch(
		`http://localhost:4000/api/v1/product/barchart?month=${month}&year=${year}`
	  );
	  console.log(barChartResponse);
	  const barChartData = await barChartResponse.json();
  
	 
	  const pieChartResponse = await fetch(
		`http://localhost:4000/api/v1/product/piechart?month=${month}&year=${year}`
	  );
	  const pieChartData = await pieChartResponse.json();


	  res.status(200).json({
		success: true,
		barChart: barChartData.data,
		pieChart: pieChartData.data
	  });
  
	} catch (err) {
	  console.error("ERROR|| Fetching Chart Data", err);
	  res.status(500).json({ 
		success: false, 
		error: err.message 
	  });
	}
  };



  