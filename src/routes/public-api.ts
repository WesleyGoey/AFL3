import express from "express"
import { CustomerController } from "../controllers/customer-controller"
import { RestaurantController } from "../controllers/restaurant-controller"
import { OrderController } from "../controllers/order-controller"

export const publicRouter = express.Router()

publicRouter.get("/customers", CustomerController.getAllCustomers)
publicRouter.get("/customers/:id", CustomerController.getCustomerById)
publicRouter.post("/customers", CustomerController.createCustomer)
publicRouter.patch("/customers/:id", CustomerController.updateCustomer)
publicRouter.delete("/customers/:id", CustomerController.deleteCustomer)

publicRouter.get("/restaurants", RestaurantController.getAllRestaurants)
publicRouter.get("/restaurants/:id", RestaurantController.getRestaurantById)
publicRouter.get("/restaurants/open", RestaurantController.getRestaurantsByOpenStatus)
publicRouter.post("/restaurants", RestaurantController.createRestaurant)
publicRouter.patch("/restaurants/:id", RestaurantController.updateRestaurant)
publicRouter.delete("/restaurants/:id", RestaurantController.deleteRestaurant)

publicRouter.get("/orders", OrderController.getAllOrders)
publicRouter.get("/orders/customer/:customerId", OrderController.getOrdersByCustomer)
publicRouter.get("/orders/restaurant/:restaurantId", OrderController.getOrdersByRestaurant)
publicRouter.post("/orders", OrderController.createOrder)