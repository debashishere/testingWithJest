const express = require("express");
const createRestaurant = require("./createRestaurant");
const router = express.Router();

router.post("/", async (req, res) => {
    const { name, location, cost } = req.body
    try{
        const { restaurantId } = await createRestaurant(name, location, cost);
        res.json({
            restaurantId
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router;