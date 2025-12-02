import { Customer } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import {
  CustomerCreateUpdateRequest,
  CustomerResponse,
  toCustomerResponse,
  toCustomerResponseList,
} from "../models/customer-model"
import { prismaClient } from "../utils/database-util"
import { CustomerValidation } from "../validations/customer-validation"
import { Validation } from "../validations/validation"

export class CustomerService {
  static async getAllCustomers(): Promise<CustomerResponse[]> {
    const customers = await prismaClient.customer.findMany()
    return toCustomerResponseList(customers)
  }

  static async getCustomerById(id: number): Promise<CustomerResponse> {
    const customer = await this.checkCustomerExists(id)
    return toCustomerResponse(customer)
  }

  static async checkCustomerExists(id: number): Promise<Customer> {
    const customer = await prismaClient.customer.findUnique({
      where: { id },
    })
    if (!customer) {
      throw new ResponseError(404, "Customer not found!")
    }
    return customer
  }

  static async createCustomer(reqData: CustomerCreateUpdateRequest): Promise<string> {
    const validated = Validation.validate(CustomerValidation.CREATE_UPDATE, reqData)
    await prismaClient.customer.create({
      data: {
        name: validated.name,
        phone: validated.phone,
      },
    })
    return "Customer has been created successfully!"
  }

  static async updateCustomer(id: number, reqData: Partial<CustomerCreateUpdateRequest>): Promise<string> {
    if (!reqData.name && !reqData.phone) {
      throw new ResponseError(400, "No fields to update")
    }
    await this.checkCustomerExists(id)
    await prismaClient.customer.update({
      where: { id },
      data: {
        ...(reqData.name !== undefined ? { name: reqData.name } : {}),
        ...(reqData.phone !== undefined ? { phone: reqData.phone } : {}),
      },
    })
    return "Customer has been updated successfully!"
  }

  static async deleteCustomer(id: number): Promise<string> {
    await this.checkCustomerExists(id)
    await prismaClient.customer.delete({
      where: { id },
    })
    return "Customer has been deleted successfully!"
  }
}