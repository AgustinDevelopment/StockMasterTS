import request from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

describe('GET /api', () => {
    
    test('send back a json response', async() => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        // Contraparte
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db') // Simulamos la conexion a la BD

describe('connectDB', () => {
    test('handle database conection error', async() => {
        jest.spyOn(db, 'authenticate') // Creamos un 'espia' en el metodo 'authenticate' del objeto 'db'
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD')) // Simulamos un error del espia para forzar el catch
        
        const consoleSpy = jest.spyOn(console, 'log') // Constante para almacenar al espia

        await connectDB() // Llamamos a la funcion

        expect(consoleSpy).toHaveBeenCalledWith( // Verificamos que el mensaje sea el correcto
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})

