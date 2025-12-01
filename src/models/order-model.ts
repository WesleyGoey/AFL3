import { Order } from "../../generated/prisma"

export interface OrderCreateRequest {
    customerId: number
    restaurantId: number
    itemCount: number
}

export interface OrderResponse extends OrderCreateRequest {
    id: number
    orderTime: string
    etaMinutes: number
}

export function computeEtaMinutes(itemCount: number): number {
    return itemCount * 10 + 10
}

export function toOrderResponseList(prismaOrders: Order[]): OrderResponse[] {
    return prismaOrders.map((o) => toOrderResponse(o))
}

export function toOrderResponse(prismaOrder: Order): OrderResponse {
    return {
        id: prismaOrder.id,
        customerId: prismaOrder.customerId,
        restaurantId: prismaOrder.restaurantId,
        itemCount: prismaOrder.itemCount,
        orderTime: prismaOrder.orderTime instanceof Date ? prismaOrder.orderTime.toISOString() : String(prismaOrder.orderTime),
        etaMinutes: prismaOrder.etaMinutes ?? computeEtaMinutes(prismaOrder.itemCount),
    }
}