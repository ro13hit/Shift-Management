const Employee = require("../models/employee")
const Shifts = require("../models/shifts")
const {check, validationResult} = require("express-validator")
const Manager = require("../models/manager")

exports.getManagerById = (req, res, next, id)=>{
    Manager.findById(id).exec((err, manager)=>{
        if(err || !manager){
            return res.status(400).json({
                error: "Manager not found for this id please check again!"
            })
        }
        req.profile = manager;
        next();
    })
}

exports.addEmployee = (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const s = new Date(req.body.Start)
    const e = new Date(req.body.End)
    const Manager = req.profile._id
    if(!(s.getHours()>="08" && e.getHours()<="17" && s.getHours()<e.getHours() || s.getHours()>="22" && e.getHours()<="07" && s.getHours()>e.getHours())){
        return res.status(400).json({
            err: "Start time or end time is invalid range is 8-17 or 22-5"
        })
    }
    const {empId, name, Location, Project, Gender, Start, Recurring, End} = (req.body)
    const employee = new Employee({empId, name, Manager, Location, Project, Gender, Start, Recurring, End})
    employee.save((err, employee)=>{
        if(err){
            return res.status(400).json({
                err: "Saving data to DB failed check check if employee already exists!"
            })
        }
        const {empId,name,Manager, Start, End} = (employee)
        const shifts = new Shifts({empId,name,Manager,Start,End})
        shifts.save((err,shifts)=>{
            if(err){
                return res.status(400).json({
                    err: err
                })
            }
            res.json({
                success: 'true',
                _id: employee._id,
                empId: employee.empId,
                name: employee.name,
                Manager: employee.Manager,
                Location: employee.Location,
                Project: employee.Project,
                Gender: employee.Gender,
                Start: employee.Start.toString(),
                Recurring: employee.Recurring,
                End: employee.End.toString()
            })
        }) 
    })
}

exports.updateEmployee = (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const s = new Date(req.body.update.Start)
    const e = new Date(req.body.update.End)
    if(!(s.getHours()>="08" && e.getHours()<="17" && s.getHours()<e.getHours() || s.getHours()>="22" && e.getHours()<="07" && s.getHours()>e.getHours())){
        return res.status(400).json({
            err: "Start time or end time is invalid range is 8-17 or 22-5"
        })
    }
    Employee.findOne({empId: req.body.empId}).exec((err, employee)=>{
        if(err || !employee){
            return res.status(400).json({
                err: "couldn't find the employee"
            })
        }
        if(s.getTime()<=new Date(employee.End.toString()).getTime() && e.getTime()>=new Date(employee.End.toString()).getTime()){
            return res.status(400).json({
                err: "Cannot overlap two shift data change the dates"
            })
        }
        Employee.findOneAndUpdate(
            {empId: req.body.empId},
            {$set: req.body.update},
            {new: true, useFindAndModify: false},
            (err, employee)=>{
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }
                const {empId,name,Manager, Start, End} = (employee)
                const shifts = new Shifts({empId,name,Manager,Start,End})
                shifts.save((err,shifts)=>{
                    if(err){
                        return res.status(400).json({
                            err: err
                        })
                    }
                    res.json({
                        success: 'true',
                        empId: employee.empId,
                        name: employee.name,
                        Manager: employee.Manager,
                        Location: employee.Location,
                        Project: employee.Project,
                        Gender: employee.Gender,
                        Start: employee.Start.toString(),
                        Recurring: employee.Recurring,
                        End: employee.End.toString()
            })
        }) 
            }
        )
    })
}


exports.getShiftHistory = (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const empId = req.body.empId
    Employee.findOne({empId: empId}).exec((err, employee)=>{
        if(err || !employee){
            return res.status(400).json({
                error: "Employee not found for this id please check again!"
            })
        }
        Shifts.find({empId: empId}).exec((err, shifts)=>{
            if(err || !shifts){
                return res.status(400).json({
                    error: "Couldn't find shift data"
                })
            }
            res.json({
                success: 'true',
                shifts
            });
        })
    })
}


exports.getProjectList = (req,res)=>{
    const manager = req.profile._id
    Employee.find({Manager: manager})
            .select({'Project':1, "_id":0})
            .exec((err,employee)=>{
                if(err){
                    return res.status(400).json({
                        error: "Couldn't find projects"
                    })
                }
                res.json({
                    success: 'true',
                    employee})
            })
}


exports.getFemaleShifts = (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    var start = new Date(req.body.year, req.body.month-1, 1, 0, 0, 0)
    var end = new Date(req.body.year, req.body.month-1, 31, 24, 0, 0)
    Employee.countDocuments({"Gender":"Female","Start":{$gt:start.toString(),$lt:end.toString()}},(err,count)=>{
        if(err){
            return res.status(400).json({
                err: "Data not found for this request!"
            })
        }
        res.json({
            success: 'true',
            count
        })
    }) 
}

//this api is not complete i couldn't make the logic to do it :(
exports.eligibleEmployees = (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    var start = new Date(req.body.year, req.body.month-1, 1, 16, 30, 0)
    var end = new Date(req.body.year, req.body.month-1, 31, 1, 30, 0)
    Employee.find({"Start":{$gt: start, $lt:end}})
            .select({'name':1, 'Project':1, 'Location': 1, 'Start':1, 'End':1})
            .exec((err,employee)=>{
                if(err){
                    return res.status(400).json({
                        err: "No records match the request!"
                    })
                }
                res.json(employee)
            })
    
}