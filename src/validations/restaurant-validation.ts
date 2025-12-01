import z, { ZodType } from "zod"

export class RestaurantValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be string!",
            })
            .min(1, {
                error: "Name can not be empty!",
            }),
        description: z
            .string({
                error: "Description must be string!",
            })
            .optional(),
        isOpen: z
            .boolean({
                error: "isOpen must be boolean!",
            })
            .optional(),
    })
}