const app = require('../../app') 
const request = require('supertest')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

let user

describe('test /api/v1/users()', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany()
    })

    test('test email belum terdaftar -> sukses', async () => {
        try {
            let email = 'usertest@mail.com'
            let name = 'usertest'
            let password = 'pasword123'

            let {statusCode,body}= await request(app).post('/api/v1/users').send({email,name,password})
            user = body.data
            expect(statusCode).toBe(201)
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('email')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('password')
            expect(body.data.email).toBe(email)
            expect(body.data.name).toBe(name)
            expect(body.data.password).toBe(password)

            // return user2
            
            
        } catch (err) {
            expect(err).toBe('error')
        }
    })
// 
    test('test email sudah terdaftar -> error', async () => {
        try {
            let email = 'usertest@mail.com'
            let name = 'usertest'
            let password = 'pasword123'

            let {statusCode,body} = await request(app).post('/api/v1/users').send({email,name,password})


            expect(statusCode).toBe(400)  
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.status).toBe(false)
            expect(body.message).toBe('email sudah dipakai')
            expect(body.data).toBe(null)

        } catch (err) {
            expect(err).toBe('error')
        }
    })
})


describe('test getUserById()', () => {
    test('test cari user dengan id yang terdaftar -> sukses', async () => {
        try {
            let id = user.id
            
            let {statusCode,body} = await request(app).get(`/api/v1/users/${id}`)
            
            expect(statusCode).toBe(200)  
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.status).toBe(false)
            expect(body.message).toBe('OK')
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('email')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('password')
            expect(body.data.id).toBe(id)   
            expect(body.data.email).toBe(user.email)
            expect(body.data.name).toBe(user.name)
            expect(body.data.password).toBe(user.password)
          
        } catch (err) {
            expect(err).toBe('error')
        }
    })

    test('test cari user dengan id yang tidak terdaftar -> error', async () => {
        try {

            let id = user.id+1000
 
            let {statusCode,body} = await request(app).get(`/api/v1/users/${id}`)
            
            expect(statusCode).toBe(400)  
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.status).toBe(false)
            expect(body.message).toBe('user tidak ditemukan')
            expect(body.data).toBe(null)
           
        } catch (err) {
            expect(err).toBe('error')
        }
    })
});



////article




describe('test /api/v1/article/:userId', () => {

    test('test 1', async () => {
        try {
            let title = 'article title'
            let articleBody = 'article body'
            let userId = 9999
            let {statusCode,_body}= await request(app).post(`/api/v1/article/${userId}`).send({title : title,body : articleBody})
            

            expect(statusCode).toBe(400)  
            expect(_body).toHaveProperty('status')
            expect(_body).toHaveProperty('message')
            expect(_body).toHaveProperty('data')
            expect(_body.status).toBe(false)
            expect(_body.message).toBe('No User found')
            expect(_body.data).toBe(null)

        } catch (err) {
            expect(err).toBe('error')
        }
    })


    test('test 2', async () => {
        try {
            let title = 'article title'
            let articleBody = ''
            let userId = user.id
            let {statusCode,_body}= await request(app).post(`/api/v1/article/${userId}`).send({title : title,body : articleBody})
            
            
            expect(statusCode).toBe(400)  
            expect(_body).toHaveProperty('status')
            expect(_body).toHaveProperty('message')
            expect(_body).toHaveProperty('data')
            expect(_body.status).toBe(false)
            expect(_body.message).toBe('body is empty!')
            expect(_body.data).toBe(null)

        } catch (err) {
            expect(err).toBe('error')
        }
    })

    test('-> berhasil' , async () => {
        try {
            let title = 'article title'
            let articleBody = 'article body'
            let userId = user.id
            let {statusCode,_body}= await request(app).post(`/api/v1/article/${userId}`).send({title : title,body : articleBody})
            expect(statusCode).toBe(201)
            expect(_body).toHaveProperty('status')
            expect(_body).toHaveProperty('message')
            expect(_body).toHaveProperty('data')
            expect(_body.data).toHaveProperty('id')
            expect(_body.data).toHaveProperty('title')
            expect(_body.data).toHaveProperty('body')
            expect(_body.data).toHaveProperty('user_id')
            expect(_body.data.title).toBe(title)
            expect(_body.data.body).toBe(articleBody)
            expect(_body.data.user_id).toBe(userId)
            
            
        } catch (err) {
            expect(err).toBe('error')
        }
    })
// 
    
})







