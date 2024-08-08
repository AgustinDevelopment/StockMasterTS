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

// Test GET
describe('GET /api/products', () => {

    test('Check if api/products url exists', async () => {
        const response = await request(server).get('/api/products') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).not.toBe(404) // Verificamos que el codigo de estado no sea 404
    })

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

// TEST GET for ID
describe('GET /api/products/:id', () => {

    test('Return a 404 response for a non-existent products', async () => { 
        const productId = 3000 // Creamos una constante para el ID
        const response = await request(server).get(`/api/products/${productId}`) // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(404) // Verificamos que el código de estado sea 404
        expect(response.body).toHaveProperty('error') // Verificamos que la respuesta tenga la propiedad error
        expect(response.body.error).toBe("Producto No Encontrado") // Verificamos que el mensaje de error sea "Producto No Encontrado"
    })

    test('Check a valid ID in the URL', async() => {
        const response = await request(server).get('/api/products/not-valid-url') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(400) // Verificamos que el codigo de estado sea 400
        expect(response.body).toHaveProperty('errors') // Verificamos que la respuesta tenga la propiedad error
        expect(response.body.errors).toHaveLength(1) // Verificamos que la propiedad tenga la longitud de 1
        expect(response.body.errors[0].msg).toBe('ID no valido') // Verificamos que el mensaje sea 'ID no valido'
    })

    test('Get a JSON response for a single product', async() => {
        const response = await request(server).get('/api/products/1') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(200) // Verificamos que el codigo de estado sea 200
        expect(response.body).toHaveProperty('data') // Verificamos que la respuesta tenga la propiedad data
    })

})

// TEST PUT
describe('PUT /api/products/:id', () => {

    test('Check a valid ID in the URL', async() => {
        const response = await request(server).put('/api/products/not-valid-url').send({ // Almacenamosla solicitud HTTP usando supertest
            name : "TEST PUT",
            availability : true,
            price : 100
        }) 

        expect(response.status).toBe(400) // Verificamos que el codigo de estado sea 400
        expect(response.body).toHaveProperty('errors') // Verificamos que la respuesta tenga la propiedad error
        expect(response.body.errors).toHaveLength(1) // Verificamos que la propiedad tenga la longitud de 1
        expect(response.body.errors[0].msg).toBe('ID no valido') // Verificamos que el mensaje sea 'ID no valido'
    })

    test('Display validation error messages when updating a product', async () => { 
        const response = await request(server).put('/api/products/1').send({}) // Almacenamosla solicitud HTTP usando supertest (actualizacion vacia)

        expect(response.status).toBe(400) // Verificamos que el código de estado sea 400
        expect(response.body).toHaveProperty('errors') // Verificamos que tenga la propiedad de erros
        expect(response.body.errors).toHaveLength(5) // Verificamos que la propiedad tenga una longitud de 5

        // Contraparte
        expect(response.status).not.toBe(200) // No esperamos codigo de estado 200
        expect(response.body).not.toHaveProperty('data') // No esperamos que tenga la propiedad data
    })

    test('Validate that the price is greater than 0', async () => { 
        const response = await request(server).put('/api/products/1').send({ // Almacenamosla solicitud HTTP usando supertest 
            name : "TEST PUT",
            availability : true,
            price : 0
        }) 

        expect(response.status).toBe(400) // Verificamos que el código de estado sea 400
        expect(response.body).toHaveProperty('errors') // Verificamos que tenga la propiedad de erros
        expect(response.body.errors).toHaveLength(1) // Verificamos que la propiedad tenga una longitud de 1
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a cero') // Verificamos que el mensaje de error sea el mismo

        // Contraparte
        expect(response.status).not.toBe(200) // No esperamos codigo de estado 200
        expect(response.body).not.toHaveProperty('data') // No esperamos que tenga la propiedad data
    })

    test('Return a 404 response for a non-existent product', async () => { 
        const productId = 3000 
        const response = await request(server).put(`/api/products/${productId}`).send({ // Almacenamosla solicitud HTTP usando supertest 
            name : "TEST PUT",
            availability : true,
            price : 100
        }) 

        expect(response.status).toBe(404) // Verificamos que el código de estado sea 404
        expect(response.body.error).toBe('Producto No Encontrado') // Verificamos que el mensaje de error sea el mismo

        // Contraparte
        expect(response.status).not.toBe(200) // No esperamos codigo de estado 200
        expect(response.body).not.toHaveProperty('data') // No esperamos que tenga la propiedad data
    })

    test('Update an existing product with valid data', async () => { 
        const response = await request(server).put(`/api/products/1`).send({ // Almacenamosla solicitud HTTP usando supertest 
            name : "TEST PUT",
            availability : true,
            price : 100
        }) 

        expect(response.status).toBe(200) // Verificamos que el código de estado sea 200 
        expect(response.body).toHaveProperty('data') // Verificamos que tenga la propiedad data

        // Contraparte
        expect(response.status).not.toBe(400) // No esperamos codigo de estado 400
        expect(response.body).not.toHaveProperty('errors') // No esperamos que tenga la propiedad errors
    })

})

// TEST PATCH
describe('PATCH /api/products/:id', () => {

    test('Return a 404 response for a non-existing product', async () => {
        const productId = 3000
        const response = await request(server).patch(`/api/products/${productId}`) // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(404) // Verificamos que el codigo de estado sea 404
        expect(response.body.error).toBe('Producto No Encontrado') // Verificamos que el mensaje de error sea 'Producto No Entonctrado'

        // Contraparte
        expect(response.status).not.toBe(200) // Verificamos que el codigo de estado no sea 200
        expect(response.body).not.toHaveProperty('data') // Verificamos que la respuesta no tenga la propiedad data
    })

    test('Update the product availability', async() => {
        const response = await request(server).patch('/api/products/1') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(200) // Verificamos que el codigo de estado sea 200
        expect(response.body).toHaveProperty('data') // Verificamos que la respuesta tenga la propiedad data
        expect(response.body.data.availability).toBe(false) // Verificamos que la availability pase a ser false

        // Contraparte
        expect(response.status).not.toBe(404) // Verificamos que el codigo de estado no sea 404
        expect(response.status).not.toBe(400) // Verificamos que el codigo de estado no sea 400
        expect(response.body).not.toHaveProperty('error') // Verificamos que no tenemos la propiedad de 'error'
    })

})

// TEST DELETE
describe('DELETE /api/products/:id', () => {

    test('Check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-id') // Almacenamosla solicitud HTTP usando supertest

        expect(response.status).toBe(400) // Verificamos que el codido de estado sea 400
        expect(response.body).toHaveProperty('errors') // Verificamos que tengamos la propiedad de 'errors'
        expect(response.body.errors[0].msg).toBe('ID no valido') // Verificamos que el mensaje de error sea 'ID no valido'
    })

    test('Return a 404 response for a non-existing product', async () => {
        const productId = 3000
        const response = await request(server).delete(`/api/products/${productId}`) // Almacenamos la solicitud HTTP usando supertest

        expect(response.status).toBe(404) // Verificamos que el codido de estado sea 404
        expect(response.body.error).toBe('Producto No Encontrado') // Verificamos que el mensaje sea 'Producto No Encontrado'

        // Contraparte
        expect(response.status).not.toBe(200) // Verificamos que el codido de estado no sea 200
    })

    test('Delete a product', async () => {
        const response = await request(server).delete('/api/products/1') // Almacenamosla solicitud HTTP usando supertest
 
        expect(response.status).toBe(200) // Verificamos que el codido de estado sea 200
        expect(response.body.data).toBe('Producto eliminado') // Verificamos que el mensaje sea 'Producto eliminado'

        // Contraparte
        expect(response.status).not.toBe(404) // Verificamos que el codido de estado no sea 404
        expect(response.status).not.toBe(400) // Verificamos que el codido de estado no sea 400
    })

    



})

