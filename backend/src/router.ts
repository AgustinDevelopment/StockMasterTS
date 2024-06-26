import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', 
    
    getProducts

)

router.post('/', 
    
    // Validacion
    body('name')
                .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
                
                

    body('price')
                .isNumeric().withMessage('Valor no valido')
                .notEmpty().withMessage('El precio del Producto no puede ir vacio')
                .custom((value => value > 0)).withMessage('El precio debe ser mayor a cero'),
                
    handleInputErrors,
    createProduct
)

router.put('/', (req, res) => {
    res.json('desde put')
})

router.patch('/', (req, res) => {
    res.json('desde patch')
})

router.delete('/', (req, res) => {
    res.json('desde delete')
})

export default router