import { Request, Response, NextFunction } from "express"
import { OrderCreateRequest } from "../models/order-model"
import { OrderService } from "../services/order-service"

export class OrderController {
  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrderService.getAllOrders()
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async getOrdersByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = Number(req.params.customerId)
      const data = await OrderService.getOrdersByCustomer(customerId)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async getOrdersByRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurantId = Number(req.params.restaurantId)
      const data = await OrderService.getOrdersByRestaurant(restaurantId)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body as OrderCreateRequest
      const message = await OrderService.createOrder(reqData)
      res.status(201).json({ message })
    } catch (error) {
      next(error)
    }
  }
}