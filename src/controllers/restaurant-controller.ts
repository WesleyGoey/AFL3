import { Request, Response, NextFunction } from "express"
import {
  RestaurantCreateUpdateRequest,
} from "../models/restaurant-model"
import { RestaurantService } from "../services/restaurant-service"

export class RestaurantController {
  static async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantService.getAllRestaurants()
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async getRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const data = await RestaurantService.getRestaurantById(id)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async getRestaurantsByOpenStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const isOpen = req.query.isOpen === "true"
      const data = await RestaurantService.getRestaurantsByOpenStatus(isOpen)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body as RestaurantCreateUpdateRequest
      const message = await RestaurantService.createRestaurant(reqData)
      res.status(201).json({ message })
    } catch (error) {
      next(error)
    }
  }

  static async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const reqData = req.body as Partial<RestaurantCreateUpdateRequest>
      const message = await RestaurantService.updateRestaurant(id, reqData)
      res.status(200).json({ message })
    } catch (error) {
      next(error)
    }
  }

  static async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const message = await RestaurantService.deleteRestaurant(id)
      res.status(200).json({ message })
    } catch (error) {
      next(error)
    }
  }
}