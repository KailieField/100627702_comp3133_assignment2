const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Employee = require('../models/Employee')



// -- GRAPHQL SCHEMA BUILDING --
const graphqlSchema = buildSchema(`

    type User {

        _id: ID!
        username: String!
        email: String!
        created_at: String
        updated_at: String
    
    }
    
    type Employee {
        
        _id: ID!
        first_name: String!
        last_name: String!
        email: String
        gender: String
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String

    }

    type Query {

    login(username: String!, password: String!): String
    getAllEmployees: [Employee!]
    searchEmployeeByEid(eid: ID!): Employee
    searchEmployees(designation: String, department: String): [Employee!]

    }

    type Mutation {

        signup(username: String!, email: String!, password: String!): User
        addEmployee(

            first_name: String!,
            last_name: String!,
            email: String,
            gender: String,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String

        ): Employee

        updateEmployeeByEid(

            eid: ID!,
            first_name: String,
            last_name: String,
            email: String,
            gender: String,
            designation: String,
            salary: Float,
            date_of_joining: String,
            department: String,
            employee_photo: String    

        ): Employee
        deleteEmployeeByEid(eid: ID!): String
    }
`);

const queryHandlers = {


// -- Resolvers and Validations --
    login: async ({ username, password }) => {

        if (!username || username.trim().length === 0){
            throw new Error("USERNAME IS REQUIRED.")
        }

        if (!password || password.trim().length === 0){
            throw new Error("PASSWORD IS REQUIRED.")
        }

        const user = await User.findOne({ username })
        
        if(!user) throw new Error('USER CANNOT BE FOUND IN DATABASE.')

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new Error('INVALID CREDENTIALS PROVIDED.')

        return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    },

    signup: async ({ username, email, password }) => {

        if (!username || username.trim().length < 4){
            throw new Error("USERNAME MUST BE 4 CHARS IN LENGTH.")
        }

        if (!email || !email.includes("@") || !email.includes(".")) {
            throw new Error("INVALID. MUST HAVE @")
        }

        if (!password || password.length < 6){
            throw new Error("PASSWORD MUST BE > 6 CHARS.")
        }

        const userExists = await User.findOne({ Sor: [{ username }, { email }] })
        if(userExists) {
            throw new Error("USER ALREADY EXISTS.")
        }

        const hashedPass = await bcrypt.hash(password, 12)

        const user = new User({ username, email, password: hashedPass })

        return await user.save()

    },

    getAllEmployees: async () => await Employee.find(),

    searchEmployeeByEid: async ({ eid }) => {
        const employee = await Employee.findById(eid)
        if (!employee) throw new Error("EMPLOYEE NOT FOUND IN DATABASE.")
        return employee
    },

    searchEmployees: async ({ designation, department }) => {

        const query = {}

        if (designation) query.designation = designation

        if (department) query.department = department

        return await Employee.find(query)

    },

    addEmployee: async (args) => {
        const { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo } = args
        if(!first_name || first_name.trim().length < 1){
            throw new Error("FIRST NAME MUST BE LONGER THAN 1 CHAR.")
        }

        if(!last_name || last_name.trim().length < 1){
            throw new Error("LAST NAME MUST BE LONGER THAN 1 CHAR.")
        }

        if(!designation || designation.trim().length < 1){
            throw new Error("DESIGNATION MUST BE LONGER THAN 1 CHAR.")
        }

        if(!department || department.trim().length < 1){
            throw new Error("DEPARTMENT MUST BE LONGER THAN 1 CHAR.")
        }

        if(!salary || salary < 1000){
            throw new Error("SALARY MUST BE > 1000.")
        }

        if (email){
            if (!email.includes("@") || !email.includes(".")){
                throw new Error("INVALID FORMAT.")
            }

            const employeeExists = await Employee.findOne({ email });
            if (employeeExists){
                throw new Error("EMPLOYEE ALREADY EXISTS.")
            }
        }

        const employee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            designation,
            salary,
            date_of_joining: date_of_joining || new Date().toISOString(),
            department,
            employee_photo
    });
        
        return await employee.save()

    },

    updateEmployeeByEid: async ({ eid, ...args }) => {

        const employee = await Employee.findById(eid)
        if (!employee) throw new Error("EMPLOYEE CANNOT BE FOUND IN DATABASE.")

        if (args.first_name && args.first_name.trim().length < 1){
            throw new Error("FIRST NAME MUST BE LONGER THAN 2 CHARS.")
        }

        if (args.last_name && args.last_name.trim().length < 1){
            throw new Error("LAST NAME MUST BE LONGER THAN 2 CHARS.")
        }

        if (args.email){
            if (!args.email.includes("@") || !args.email.includes(".")){
                throw new Error("INVALID FORMAT.")
            }
        }

        if(args.salary && args.salary < 1000){
            throw new Error("SALARY MUST BE > 1000.")
        }

        return await Employee.findByIdAndUpdate(eid, args, { new: true });

    },

    deleteEmployeeByEid: async ({ eid }) => {

        const employee = await Employee.findById(eid)
        if(!employee){
            throw new Error("EMPLOYEE NOT CANNOT BE FOUND IN DATABASE.")
        }

        await Employee.findByIdAndDelete(eid);
        
        return 'EMPLOYEE DETELED FROM DATABASE.'
    },


};

module.exports = {
    graphqlSchema,
    queryHandlers,
};
