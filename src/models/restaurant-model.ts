import { Restaurant } from "../../generated/prisma"

export interface RestaurantCreateUpdateRequest {
    name: string
    description?: string | null
    isOpen?: boolean
}

export interface RestaurantResponse extends RestaurantCreateUpdateRequest {
    id: number
    name: string
    description?: string | null
    isOpen: boolean
}

export function toRestaurantResponseList(prismaRestaurants: Restaurant[]): RestaurantResponse[] {
    return prismaRestaurants.map((r) => toRestaurantResponse(r))
}

export function toRestaurantResponse(prismaRestaurant: Restaurant): RestaurantResponse {
    return {
        id: prismaRestaurant.id,
        name: prismaRestaurant.name,
        description: prismaRestaurant.description ?? null,
        isOpen: prismaRestaurant.isOpen,
    }
}