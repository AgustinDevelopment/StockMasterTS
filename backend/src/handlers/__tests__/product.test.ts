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
        expect(response.status).not.toBe(404) // Verificamos que el codigo de estado no sea 404
        expect(response.body.errors).not.toHaveLength(2) // Verificamos que no tengamos 2 errores

    })

    // Testear que el precio sea mayor a cero
    test('validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({ // Almacenamosla solicitud HTTP usando supertest
            // Enviamos el objeto JSON
            name: 'Producto - Test',
            price: 0
        }) 

        expect(response.status).toBe(400) // Esperamos que la solicutud sea incorrecta
        expect(response.body).toHaveProperty('errors') // Comprobamos que la respuesta tenga la propiedad errores
        expect(response.body.errors).toHaveLength(1) // Verificamos que tengamos 1 error de validacion

        // Contraparte
        expect(response.status).not.toBe(404) // Verificamos que el codigo de estado no sea 404
        expect(response.body.errors).not.toHaveLength(2) // Verificamos que no tengamos 2 errores

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

//Test GET
describe('GET /api/products', () => {

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(200) // Esperamos codigo de estado 200 (solicitud exitosa)
        expect(response.headers['content-type']).toMatch(/json/) // Verificamos que la respuesta sea del tipo JSON
        expect(response.body).toHaveProperty('data') // Verificamos que lo respuesta tenga la propiedad data
        expect(response.body.data).toHaveLength(1) // La propiedad data tenga longitud de 1

        // Contraparte
        expect(response.body).not.toHaveProperty('errors') // Verificamos que la respuesta no tenga la propiedad de errores
    })
})

