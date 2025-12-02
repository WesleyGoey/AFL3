import { Order } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import { OrderCreateRequest, OrderResponse, computeEtaMinutes, toOrderResponse, toOrderResponseList } from "../models/order-model"
import { prismaClient } from "../utils/database-util"
import { OrderValidation } from "../validations/order-validation"
import { Validation } from "../validations/validation"

export class OrderService {
  static async getAllOrders(): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany()
    return toOrderResponseList(orders)
  }

  static async getOrdersByCustomer(customerId: number): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany({
      where: { customerId },
    })
    return toOrderResponseList(orders)
  }

  static async getOrdersByRestaurant(restaurantId: number): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany({
      where: { restaurantId },
    })
    return toOrderResponseList(orders)
  }

  static async checkOrderExists(id: number): Promise<Order> {
    const order = await prismaClient.order.findUnique({
      where: { id },
    })
    if (!order) {
      throw new ResponseError(404, "Order not found!")
    }
    return order
  }

  static async createOrder(reqData: OrderCreateRequest): Promise<string> {
    const validated = Validation.validate(OrderValidation.CREATE, reqData)
    const eta = computeEtaMinutes(validated.itemCount)
    await prismaClient.order.create({
      data: {
        customerId: validated.customerId,
        restaurantId: validated.restaurantId,
        itemCount: validated.itemCount,
        orderTime: new Date(),
        etaMinutes: eta,
      },
    })
    return "Order has been created successfully!"
  }
}