const Restaurant = require("../models/restaurant");


module.exports = async function createRestaurant(name, location, budget) {
    try{

        //check nameis not repeated
        const hasName = await Restaurant.findOne({ name: name})
        if(hasName) throw new Error(`A restaurent already exsists with that name.`)

        // create
        const newRest = new Restaurant({
            name,
            location,
            cost : budget
        })
        await newRest.save();
        
        return {
            restaurantId: newRest._id
        }
    }
    catch(err){
        throw err
    }
}