
# Shift Allowance Backend  App (Restful Web Services)

Its a system which can support to manage the data and take care of shift allowance effectively.
## API Reference

#### SignUp
```http
  POST http://localhost:8000/api/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of manager to register |
| `email`      | `string` | **Required**. Email of manager to register |
| `password`      | `string` | **Required**. Password of manager to register |

#### Signin
```http
  POST http://localhost:8000/api/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of manager to login |
| `password`      | `string` | **Required**. Password of manager to login |

#### Add Employee
```http
  POST http://localhost:8000/api/employee/addNew/managerId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `empId`      | `number` | **Required**. 4 digit employee id of employee |
| `name`      | `string` | **Required**. Name of employee |
| `Manager`      | `ObjectId` | **Required**. Manager's ObjectId(Fetched through param no need to include in body) |
| `Location`      | `string` | **Required**. Location of employee|
| `Project`      | `string` | **Required**. Project name of employee|
| `Gender`      | `string` | **Required**. Gender of employee  |
| `Start`      | `Date` | **Required**. Start date of shift of employee format YYYY-MM-DDTHH:MM:SS.530|
| `Recurring`      | `string` | **Required**. Recurring shift details of employee|
| `End`      | `Date` | **Required**. End date of shift of employee format YYYY-MM-DDTHH:MM:SS.530|

#### Update Employee
```http
  PUT http://localhost:8000/api/employee/updateEmployeeDetails/managerId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `empId`      | `number` | **Required**. 4 digit employee id of employee to find for update |
| `update`      | `JSON` | **Required**. fields which you want to be updated goes in this separate json |
| `name`      | `string` | **Required**. name of employee|
| `Location`      | `string` | **Required**. Location of employee|
| `Project`      | `string` | **Required**. Project name of employee|
| `Gender`      | `string` | **Required**. Gender of employee  |
| `Start`      | `Date` | **Required**. Start date of shift of employee format YYYY-MM-DDTHH:MM:SS.530|
| `Recurring`      | `string` | **Required**. Recurring shift details of employee|
| `End`      | `Date` | **Required**. End date of shift of employee format YYYY-MM-DDTHH:MM:SS.530|


#### getProjectList
```http
  GET http://localhost:8000/api/employee/getProjectList/managerId
```

No body required to fetch data

#### Female Shift Workers
```http
  POST http://localhost:8000/api/employee/getFemaleShifts/managerId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `year`      | `number` | **Required**. Year whose data is needed |
| `month`      | `number` | **Required**. month whose data is needed|


## Environment Variables

To run this project, all the variables are present in .env file


## Features

- no overlapping of shifts can be done
- shift time is fixed either 8AM-5PM or 10PM-7PM
- reports of projects and female shift workers can be generated
- employee's shift history can be seen


## Tech Stack

**Server:** Node, Express, MongoDB


## Run Locally

Clone the project by pasting the following link in git bash or terminal

```bash
  git clone git@bitbucket.org:r0hit13/hackathon_nodejs_rohit.git
```

Go to the project directory

```bash
  cd hackathon_nodejs_rohit

```

Install dependencies

```bash
  npm install
```

Start the application
```bash
  npm start
```
## Technical Requirements

### Steps to configure Node.js
1. Download Node.js(LTS Version) from https://nodejs.org/en/
2. Install Node.js
3. Check in terminal by commands 'node -v' and 'npm -v'

### Steps to configure Database
1. Download mongoDB from https://www.mongodb.com/try/download/community
2. Install mongoDB
3. Open MongoDB Compass
4. Enter "localhost:27017" in new connection
5. Click on '+' icon and create Database with name : "Shift-Allowance"
6. Create 3 collections name them as: 'employees', 'managers' and 'shifts'
7. Import data from data files provided in imported collections folder to respected collections.

### Alternate Way to configure Database
Just signup using signup api and then signin then keep the token in bearer authorization token and use other api's database will keep building itself. If this doesn't works try the above way.

My postman collection is also present in imported collections folder to directly test the code and learn api body requirements and data types.

## Running Tests

To run tests, run the following command

```bash
  npm test
```

