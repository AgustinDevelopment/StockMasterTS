import { DraftProductSchema } from "../types"
import { safeParse } from "valibot"
import axios from "axios"

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
            const url = 'http://localhost:4000/api/products'
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Los datos ingresados no son validos')
        }

    } catch (error) {
        console.log(error)
    }
}