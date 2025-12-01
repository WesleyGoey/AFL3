import z, { ZodType } from "zod"

export class CustomerValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be string!",
            })
            .min(1, {
                error: "Name can not be empty!",
            }),
        phone: z
            .string({
                error: "Phone must be string!",
            })
            .min(3, {
                error: "Phone can not be empty!",
            }),
    })
}
