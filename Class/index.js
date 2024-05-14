const express= require('express');
const app= express();
const courses=[
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('api/courses', (req,res)=>{
    // res.send([1,2,3]);
    res.send(courses);
});
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});
app.post('/api/courses', (req,res)=>{
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    });
    const result=schema.validate(req.body);
    console.log(result);
    if(!req.body.name||req.bpdy.name.length<3){
        res.status(400).send('Name is required and hsould be minimum 3 characters.');
        return;
    }
    const course={
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
app.get('/api/courses/:id', (req, res)=>{
    const course= courses.find(c=>c.id===parseInt(re1.params.id));
    if(!course) res.status(404).send('The course for the given ID was not found.');
    res.send(course);
});
// app.listen(3000, ()=>console.log('Listening on the port 3000'));
// app.get()
app.put('/api/courses/:id', (req,res)=>{
    //Look up the course, if not found: return 404
    const course= courses.find(c=>c.id===parseInt(re1.params.id));
    if(!course) res.status(404).send('The course for the given ID was not found.');
    //Validate. If invalid, return 400: Bad request
    const {error} = validateCourse(req.body); //result.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
        //Update course
        //Return the updated course
        course.name=req.bosy.name;
        res.send(course);
    }
})
function validateCourse(course){
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}
//MIDDLEWARE
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocalString()} Request Made to: ${req.originalUrl}`);
    next();//Move onto the next phase
}
app.use(logRequest);
app.get('/', (req,res)=>{
    res.send('Hello World');
});
app.get('/api/courses', (req,res)=>{
    res.send(courses);
});
app/post('/api/courses', (req,res)=>{
    const{error}=validateCourse(req,res)=>{
        if(error) res.status(400).send(error.details[0].message);
    }
});
//PORT
const port= process.env.PORT||3000;
app.listen(port, ()=>console.log(`Listening on the port '${port}`));