import { number, string, object } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})