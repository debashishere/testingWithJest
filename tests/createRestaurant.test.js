const createRestaurant = require('../controller/createRestaurant');
const Restaurant = require("../models/restaurant");
const db = require("./db");

beforeAll(async () =>  await db.connect());
afterEach( async () => await db.clearDatabase());
afterAll(async () => { db.clearDatabase()})

describe('Restaurants created when', () => {

    it('First restaurant', async done => {
        const  { restaurantId }  = await createRestaurant("First", "Sydney", "$");

        //find the restaurent from the db
        const restaurant = await Restaurant.findById(restaurantId);

        //check the name, location, etc
        expect(restaurant.name).toEqual("First");
        expect(restaurant.location).toEqual("Sydney");
        expect(restaurant.cost).toEqual("$");
      
        done();
    })
})

describe('Error thrown when', () => {


    it("name repetation", async done => {
        await createRestaurant("First", "Sydney", "$");
        await expect(
            createRestaurant("First", "Melbourne", "$$")
        ).rejects.toThrow(`A restaurent already exsists with that name.`)
        done();
    })

    it("invalid price", async done => {
        await expect(
            createRestaurant("First", "Melbourne", "cheap")
        ).rejects.toThrow()
        done();
    })
})