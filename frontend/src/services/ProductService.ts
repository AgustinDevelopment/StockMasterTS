import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { safeParse, number, string, transform, pipe, parse } from 'valibot';
import axios from "axios";

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

export async function getProducts() {
    try {
        const url = 'http://localhost:4000/api/products'
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        
        if(result.success) {
            return result.output
        } else {
            throw new Error('Error al obtener los productos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id: Product['id']) {
    try {
        const url = `http://localhost:4000/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        
        if(result.success) {
            return result.output
        } else {
            throw new Error('Error al obtener los productos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        // Define un esquema de número con transformación
        const NumberSchema = pipe(
            string(),
            transform((value) => {
                const num = Number(value);
                if (isNaN(num)) {
                    throw new Error('Invalid number');
                }
                return num;
            }),
            number()
        );

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price.toString()),
            availability: data.availability.toString() === 'true', // Convierte a booleano
        });

        if (result.success) {
            const url = `http://localhost:4000/api/products/${id}`;
            await axios.put(url, result.output);
        } else {
            throw new Error('Los datos ingresados no son válidos');
        }
    } catch (error) {
        console.log('Error in updateProduct:', error);
    }
}
