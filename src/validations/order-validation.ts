import z, { ZodType } from "zod"

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        customerId: z
            .number({
                error: "customerId must be number!",
            })
            .int({
                error: "customerId must be integer!",
            }),
        restaurantId: z
            .number({
                error: "restaurantId must be number!",
            })
            .int({
                error: "restaurantId must be integer!",
            }),
        itemCount: z
            .number({
                error: "itemCount must be number!",
            })
            .int({
                error: "itemCount must be integer!",
            })
            .min(1, {
                error: "itemCount must be at least 1!",
            }),
    })
}