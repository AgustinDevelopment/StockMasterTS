import { Request, Response } from 'express'
import Product from '../models/Product.model'

// Obtener Productos
export const getProducts = async(req : Request, res : Response) => {
    
    try {
        const products = await Product.findAll({
            // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

// Obtener Producto por ID
export const getProductById = async(req : Request, res : Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }

}

// Crear Producto
export const createProduct = async(req : Request, res : Response) => {

    try {
        const product = await Product.create(req.body) // Almacenar el Producto en la BD
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}