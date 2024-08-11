import { DraftProductSchema } from "../types"
import { safeParse } from "valibot"

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name, 
            price: +data.price
        })
        
        if(result.success) {
            
        } else {
            throw new Error('Los datos ingresados no son validos')
        }

    } catch (error) {
        console.log(error)
    }
}