import { Request, Response, NextFunction } from "express"
import {
  CustomerCreateUpdateRequest,
} from "../models/customer-model"
import { CustomerService } from "../services/customer-service"

export class CustomerController {
  static async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CustomerService.getAllCustomers()
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const data = await CustomerService.getCustomerById(id)
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body as CustomerCreateUpdateRequest
      const message = await CustomerService.createCustomer(reqData)
      res.status(201).json({ message })
    } catch (error) {
      next(error)
    }
  }

  static async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const reqData = req.body as Partial<CustomerCreateUpdateRequest>
      const message = await CustomerService.updateCustomer(id, reqData)
      res.status(200).json({ message })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const message = await CustomerService.deleteCustomer(id)
      res.status(200).json({ message })
    } catch (error) {
      next(error)
    }
  }
}