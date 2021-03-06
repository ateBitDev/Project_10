'use strict';

const express = require("express");
const router = express.Router();
const User = require("./UserModel").User;
const Course = require("./CourseModel").Course;
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator/check');
const auth = require('basic-auth');

const authenticateUser = async (req,res,next) => {
    let message = null;
    const credentials = auth(req);
    console.log(credentials)
    
    if(credentials){
        let user = await User.findOne({emailAddress : credentials.name});
        
    if(user){
        const authenticated = bcrypt
        .compareSync(credentials.pass, user.password);
    if(authenticated){
        console.log(`Authentication successful for username: ${user.emailAddress}`);
        req.currentUser = user;
    }else{
        message = `Authentication failure for username: ${user.emailAddress}`
    }
    }else{
        message = `User not found for username: ${credentials.name}`
    }
  }else{
      message = `Auth header not found`
    }
    if(message){
        console.warn(message);
        res.status(401).json({message: "Access Denied"})
    }else{
        next();
    }
}

router.get("/",(req,res,next)=>{
    res.json({message: "welome to the home screen"});
});

router.get("/users", authenticateUser ,(req,res,next)=>{

const user = req.currentUser;
console.log(user)

res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password,
    id : user._id   
    });
});



router.post("/users",[
    check('firstName')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a first name'),
    check('lastName')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a last name'),
    check('emailAddress')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('please enter an email address'),
    check('password')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage("please enter a password"),

],(req,res,next)=>{
    let errors = validationResult(req);
    let errorMessages = [];

    let isValidEmail = (userEmail) =>
    {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
    }

    if(!errors.isEmpty()){
         errorMessages = errors.array().map(error => error.msg);
    }

    if(!isValidEmail(req.body.emailAddress) && req.body.emailAddress !== "") {
        errorMessages.push("The email field has to follow this example : Example@domain.com");
    }
    
    if(req.body.confirmPassword !== req.body.password) {
        errorMessages.push("passwords don't match");
    }

    if(errorMessages.length !== 0) {
       return res.status(400).json({errors:errorMessages})
    }

    let user = new User(req.body);
    user.password = bcrypt.hashSync(user.password);
    user.save(function(err, user){
        if(err) next(err);
        res.location("/")
        res.sendStatus(201)
    });
   
});

router.get("/courses",(req,res,next)=>{
     Course.find({})
     .exec(function(err,courses){
        if(err) next(err);
        res.status(200);
        res.json(courses);
     });
});

router.get("/courses/:id",(req,res,next)=>{
    Course.findById(req.params.id)
    .exec(function(err,course){
       if(err) next(err);
       res.status(200);
       res.json(course);
    });
});

router.post("/courses",[
    check('title')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a title'),
    check('description')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a description'),
    // check('estimatedTime')
    // .exists({checkNull:true,checkFalsy:true})
    // .withMessage('please enter an estimatedTime'),
    // check('materialsNeeded')
    // .exists({checkNull:true,checkFalsy:true})
    // .withMessage("please enter the materialsNeeded"),
],(req,res,next)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);

       return res.status(400).json({errors:errorMessages})
    }

    let course = new Course(req.body);
    course.save(function(err,course){
        if(err) next(err);
        res.location("/")
        res.sendStatus(201)
    });
});

router.put("/courses/:id",[
    check('title')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a title'),
    check('description')
    .exists({checkNull:true,checkFalsy:true})
    .withMessage('Please enter a description'),
    // check('estimatedTime')
    // .exists({checkNull:true,checkFalsy:true})
    // .withMessage('please enter an estimatedTime'),
    // check('materialsNeeded')
    // .exists({checkNull:true,checkFalsy:true})
    // .withMessage("please enter the materialsNeeded"),
],(req,res,next)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);

       return res.status(400).json({errors:errorMessages})
    }

    Course.findById(req.params.id)
    .exec(function(err,course){
        if(err) next(err); 
        course.update(req.body, function(err,course){
            if(err) next(err); 
            res.location("/")
            res.sendStatus(204)
        })
    })
});

router.delete("/courses/:id",(req,res,next)=>{
    Course.findById(req.params.id)
    .exec(function(err,course){
        if(err) next(err);
        course.remove(function(err, course){
            if(err) next(err);
            res.location("/")
            res.sendStatus(204)
        });
        
    });
});

module.exports = router;