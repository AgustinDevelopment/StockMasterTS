import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const createProduct = async(req : Request, res : Response) => {

    const product = await Product.create(req.body) // Almacenar el Producto en la BD
    res.json({data: product})
}