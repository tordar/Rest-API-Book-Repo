const mongoose = require('mongoose');

// Connect to DB
const DBConnection = async () =>{
	try {
			const connection = await mongoose.connect(process.env.DB_CONNECTION, { 
					useNewUrlParser: true, 
					useUnifiedTopology: true, 
					useFindAndModify: false      
			})
			console.log(`MongoDB connected on: ${connection.connection.host}`)
	} catch (error) {
			console.error(error.message)
			process.exit(1)
	}}

	module.exports = DBConnection