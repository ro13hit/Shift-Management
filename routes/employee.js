var express = require("express")
var router = express.Router();
const {check, validationResult} = require("express-validator");

const {isSignedIn} = require("../controllers/auth");
const { addEmployee, getManagerById, getFemaleShifts, getProjectList, getShiftHistory, updateEmployee, eligibleEmployees } = require("../controllers/employee");

//param
router.param("managerId", getManagerById)

router.post("/employee/addNew/:managerId",
    [
    check("empId", "Employee Id is required ").isLength({min: 4}),
    check("name", "Name is required").isLength({min: 1}), 
    check("Project","Project Name is required").isLength(1),  
    check("Location","Location is required").isLength(1),  
    check("Gender","Gender is required").isLength(1),  
    check("Start","Start date is required").isLength(1),  
    check("Recurring","Recurring information is required").isLength(1),  
    check("End","End date is required").isLength(1)  
    ],
    isSignedIn, addEmployee)

router.post("/employee/getShiftHistory/:managerId", isSignedIn, getShiftHistory)

router.post("/employee/getFemaleShifts/:managerId",
    [
        check("year","year is required to calculate count format: YYYY").isLength({min: 4}),
        check("month","month is required to calculate the count").isLength({min: 1})
    ], 
    isSignedIn, getFemaleShifts);

router.get("/employee/getProjectList/:managerId", isSignedIn, getProjectList);

router.put("/employee/updateEmployeeDetails/:managerId",
    [
        check("empId","4 digit employee Id is required to find employee for update").isLength({min: 4}),
        check("update","update structure is required to set fields for update").isLength({min: 1}),
    ],
    isSignedIn, updateEmployee)

router.post("/employee/eligibleEmployees/:managerId",
    [
        check("year","year is required to find data format: YYYY").isLength({min: 4}),
        check("month","month is required to find data").isLength({min: 1})
    ],
    isSignedIn, eligibleEmployees)

module.exports = router;