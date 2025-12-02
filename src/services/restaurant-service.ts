import { Restaurant } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import {
  RestaurantCreateUpdateRequest,
  RestaurantResponse,
  toRestaurantResponse,
  toRestaurantResponseList,
} from "../models/restaurant-model"
import { prismaClient } from "../utils/database-util"
import { RestaurantValidation } from "../validations/restaurant-validation"
import { Validation } from "../validations/validation"

export class RestaurantService {
  static async getAllRestaurants(): Promise<RestaurantResponse[]> {
    const restaurants = await prismaClient.restaurant.findMany()
    return toRestaurantResponseList(restaurants)
  }

  static async getRestaurantById(id: number): Promise<RestaurantResponse> {
    const restaurant = await this.checkRestaurantExists(id)
    return toRestaurantResponse(restaurant)
  }

  static async getRestaurantsByOpenStatus(isOpen: boolean): Promise<RestaurantResponse[]> {
    const restaurants = await prismaClient.restaurant.findMany({
      where: { isOpen },
    })
    return toRestaurantResponseList(restaurants)
  }

  static async checkRestaurantExists(id: number): Promise<Restaurant> {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id },
    })
    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found!")
    }
    return restaurant
  }

  static async createRestaurant(reqData: RestaurantCreateUpdateRequest): Promise<string> {
    const validated = Validation.validate(RestaurantValidation.CREATE_UPDATE, reqData)
    await prismaClient.restaurant.create({
      data: {
        name: validated.name,
        description: validated.description ?? null,
        isOpen: validated.isOpen ?? false,
      },
    })
    return "Restaurant has been created successfully!"
  }

  static async updateRestaurant(id: number, reqData: Partial<RestaurantCreateUpdateRequest>): Promise<string> {
    if (reqData.name === undefined && reqData.description === undefined && reqData.isOpen === undefined) {
      throw new ResponseError(400, "No fields to update")
    }
    await this.checkRestaurantExists(id)
    await prismaClient.restaurant.update({
      where: { id },
      data: {
        ...(reqData.name !== undefined ? { name: reqData.name } : {}),
        ...(reqData.description !== undefined ? { description: reqData.description } : {}),
        ...(reqData.isOpen !== undefined ? { isOpen: reqData.isOpen } : {}),
      },
    })
    return "Restaurant has been updated successfully!"
  }

  static async deleteRestaurant(id: number): Promise<string> {
    await this.checkRestaurantExists(id)
    await prismaClient.restaurant.delete({
      where: { id },
    })
    return "Restaurant has been deleted successfully!"
  }
}