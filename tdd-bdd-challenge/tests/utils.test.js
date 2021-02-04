const mocha = require("mocha")
const chai = require("chai")
const utils = require("../utils")
const expect = chai.expect

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function() {
  const hello = utils.sayHello()
  expect(hello).to.be.a("string")
  expect(hello).to.equal("Hello")
  expect(hello).with.lengthOf(5)
})

// ========================================================
// Level 1 Challenges
// 1. Write the pending tests check that they are pending, like this:
//    it("should do something that you want done")
// 2. Next, write the test and see that it fails.
// 3. Write the code in the utils.js file to make the test pass.
// 4. Finally see if you would like to refactor your code at all.
// This is called "Red-Green-Refactor"
// ========================================================

it("should return the area of a rectangle", function() {
  const area = utils.area(3, 4)
  expect(area).to.be.a("number")
  expect(area).to.equal(12)
})

it("should return null on negative rectangle width or height", function() {
  const area = utils.area(-1, 3)
  expect(area).to.be.null
})

it("should return the perimeter of a rectangle", function() {
  const perimeter = utils.perimeter(1, 1)
  expect(perimeter).to.be.a("number")
  expect(perimeter).to.equal(4)
})

it("should return null on negative rectangle width or height", function() {
  const perimeter = utils.perimeter(-1, 3)
  expect(perimeter).to.be.null
})

it("should return the radius of a circle", function() {
  const radius = utils.circleArea(3)
  expect(radius).to.be.a("number")
  expect(radius).to.equal((Math.PI * 3) ** 2)
})

it("should return null on negative radius", function() {
  const radius = utils.circleArea(-1)
  expect(radius).to.be.null
})






// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.
// ========================================================

beforeEach((done) => {
  utils.clearCart()
  done()
})

it("Should create a new (object) Item with name and price", function() {
  const item = utils.createItem("apple", 0.99)
  expect(item).to.be.a("object")
  expect(item).to.have.property("name", "apple")
  expect(item).to.have.property("price", 0.99)
  expect(item).to.have.property("quantity", 1)
})

it("Should return an array containing all items in cart", function() {
  const cart = utils.getShoppingCart()
  expect(cart).to.be.a("array")
})

it("Should add a new item to the shopping cart", function() {
  const item = utils.createItem({
    "name": "orange", 
    "price": 0.79
  })
  utils.addItemToCart(item)

  const cart = utils.getShoppingCart()
  expect(cart).to.be.a("array")
  expect(cart).to.have.length(1)
})

it("Should return the number of items in the cart", function() {
const item = utils.createItem({
  "name": "orange", 
  "price": 0.79
})

utils.addItemToCart(item)
const numItems = utils.getNumItemsInCart()
expect(numItems).to.be.a("number")
expect(numItems).to.equal(1)
})

it("Should remove items from cart", function() {
  const item = utils.createItem({
    "name": "orange", 
    "price": 0.79
  })
  utils.addItemToCart(item)
  utils.addItemToCart(item)
  utils.removeItemFromCart(item)
  const cart = utils.getShoppingCart()

  expect(cart).to.be.a("array")
  expect(cart).to.have.length(1)
  
})

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart")

it("Should validate that an empty cart has 0 items")

it("Should return the total cost of all items in the cart")
