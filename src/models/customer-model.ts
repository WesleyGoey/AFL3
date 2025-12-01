import { Customer } from "../../generated/prisma"

export interface CustomerCreateUpdateRequest {
    name: string
    phone: string
}

export interface CustomerResponse extends CustomerCreateUpdateRequest {
    id: number
    name: string
    phone: string
}

export function toCustomerResponseList(prismaCustomers: Customer[]): CustomerResponse[] {
    return prismaCustomers.map((c) => toCustomerResponse(c))
}

export function toCustomerResponse(prismaCustomer: Customer): CustomerResponse {
    return {
        id: prismaCustomer.id,
        name: prismaCustomer.name,
        phone: prismaCustomer.phone,
    }
}