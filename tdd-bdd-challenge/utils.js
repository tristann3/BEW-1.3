// ========================================================
// Level 1 Challenges Due Thurday
// ========================================================

const sayHello = () => {
  return "Hello"
}

const area = (w, h) => {
  // should return the area
  if (w < 0 || h < 0){
    return null
  }
  return w * h
}

const celsiusToFarenheit = (celsius) => {
  return celsius * 9 / 5 + 32
}

const perimeter = (w, h) => {
  // should return the perimeter
  if (w < 0 || h < 0){
    return null
  }
  return (2 * w) + (2 * h)
}

const circleArea = r => {
  // should return the area of the circle
  if (r < 0) {
    return null
  }
  return ((Math.PI * r) ** 2)
}

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: You will need to implement methods below (not yet
// defined) in order to make the tests pass.
// ========================================================

const shoppingCart = []

const clearCart = () => {
  shoppingCart.length = 0
}

const createItem = (name, price) => {
  const item = {
    "name": name, 
    "price" : price
  }
  return { name, price, quantity: 1 }
}

const getShoppingCart = () => {
  // should return the current state of shopping cart
  return shoppingCart
}

const addItemToCart = (item) => {
  // should add item to shopping cart
  shoppingCart.push(item)
}

const getNumItemsInCart = () => {
  // should return the total quantity of items in cart
  return shoppingCart.length
}

const removeItemFromCart = (item) => {
  // should remove item from shopping cart
  shoppingCart.pop(item)
}

module.exports = {
  sayHello, area, perimeter, circleArea,
  clearCart, createItem, getShoppingCart, addItemToCart,
  getNumItemsInCart, removeItemFromCart, celsiusToFarenheit
}
