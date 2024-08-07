import request from 'supertest'
import server from '../../server'

// Test POST
describe('POST /api/products', () => {

    // Validar errores
    test('display validation errors', async () => {
        const response = await request(server).post('/api/products').send({}) // Almacenamosla solicitud HTTP usando supertest (producto vacio)

        expect(response.status).toBe(400) // Esperamos que la solicutud sea incorrecta
        expect(response.body).toHaveProperty('errors') // Comprobamos que la respuesta tenga la propiedad errores
        expect(response.body.errors).toHaveLength(4) // Verificamos que tengamos 4 errores de validacion

        // Contraparte
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    // Crear nuevo producto
    test('create a new product', async () => {
        const response = await request(server).post('/api/products').send({ // Almacenamosla solicitud HTTP usando supertest
            // Enviamos el objeto JSON
            name : 'Product - Testing',
            price : 100
        })

        expect(response.status).toBe(201) // Comprobamos que se creo correctamente
        expect(response.body).toHaveProperty('data') // Comprobamos que tiene la informacion correcta

        // Contraparte
        expect(response.status).not.toBe(404) // Comprobamos que el codigo de estado se encuentre
        expect(response.status).not.toBe(200) // Para crear recursos nuevos usamos 201 no 200
        expect(response.body).not.toHaveProperty('errors') // Comprobamos que no hayan errores
    })
})