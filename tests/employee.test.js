const { addEmployee, getProjectList } = require("../controllers/employee")
const supertest = require('supertest')
const mongoose = require('mongoose')
const app =  require('./server')

describe('Shift Allowance API tests', ()=>{
    var token = null;
    var id = null;
    it('Testing to see if jest works',()=>{
        expect(1).toBe(1)
    })
    
    
    beforeAll((done)=>{
        mongoose.connect('mongodb://localhost:27017/JestTest',
        {useNewUrlParser: true,  useUnifiedtTopology: true},
        ()=> done())
    })
    
    afterAll((done)=>{
        mongoose.connection.db.dropDatabase(
            ()=>done()
        )
    })
    
    test("POST /api/signup", async()=>{
        const  data = {name: "testing", email:"test@test.test", password: "testing"}
        const res = await supertest(app).post('/api/signup')
            .send(data)
            .expect(200)

        id = res.body.id;
    })
    
    test("POST /api/signin", async()=>{
        const data = {email:"test@test.test", password: "testing"}
        const res = await supertest(app).post('/api/signin')
            .send(data)
            .expect(200)
        
        token = res.body.token
        
    })
    
    test("POST /api/employee/addNew/:managerId", async()=>{
        const data = {
                empId: 8000,
                name: "testing name",
                Location: "test location",
                Project: "test Project",
                Gender: "Male",
                Start: "2022-03-01T08:00:00.530",
                Recurring: "Yes",
                End: "2022-03-05T17:00:00.530"
        }
        await supertest(app).post('/api/employee/addNew/'+id)
            .set('Authorization',`Bearer ${token}`)
            .send(data)
            .expect(200)
    })

    test("PUT /api/employee/updateEmployeeDetails/:managerId", async()=>{
        const data = {
                empId: 8000,
                update: {
                    Location: "test location 2",
                    Project: "test Project 2",
                    Start: "2022-04-06T09:00:00.530",
                    End: "2022-04-11T15:00:00.530"
                }
        }
        await supertest(app).put('/api/employee/updateEmployeeDetails/'+id)
            .set('Authorization',`Bearer ${token}`)
            .send(data)
            .expect(200)
    })

})