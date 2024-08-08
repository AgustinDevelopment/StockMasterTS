import { Request, Response } from 'express'
import Product from '../models/Product.model'

// Obtener Productos
export const getProducts = async(req : Request, res : Response) => {
    
    const products = await Product.findAll({
        // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
    })
    res.json({data: products}) // Retornamos el producto
}

// Obtener Producto por ID
export const getProductById = async(req : Request, res : Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    res.json({data: product})

}

// Crear Producto
export const createProduct = async(req : Request, res : Response) => {

    const product = await Product.create(req.body) // Almacenar el Producto en la BD
    res.status(201).json({data: product})
}

// Actualizar Producto
export const updateProduct = async(req : Request, res : Response) => {
    
    // Comprobar que el producto exista
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()
    
    res.json({data: product})

}

// Actualizar la disponibilidad
export const updateAvailability = async(req : Request, res : Response) => {

    // Comprobar que el producto exista
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability // Obtener el valor de disponibilidad e invertir el valor
    await product.save()
    
    res.json({data: product})

}

// Borrar un producto
export const deleteProduct = async(req : Request, res : Response) => {

    // Comprobar que el producto exista
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    await product.destroy()
    res.json({data: 'Producto eliminado'})
}