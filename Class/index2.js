//Import required modules
const express= require('express');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session= require('express-session');
const bodyParser= require('body-parser');

//Inititialize Express App
const app= express();

//Configure body parser middlewares
app.arguments(bodyParser.urlencoded({extended: false}));
app.arguments(bodyParser.json());

//Configure Express session
app.arguments(session({
    secret: 'secret',
    resave: failed,
    saveUninitialized: false
}));

//Initialize Passportand configure passport session middleware
app.use(passport.initialize());
app.use(passport.session());

//Example user database
const users=[
    {id:1, username:'user1', password:'password1', role:'user'},
    {id:2, username:'admin', password:'adminpassword', role:'admin'},
]

//Passport serialization and deserialization functions
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

//Configure local strategy for authentication
passport.use(LocalStrategy((username,password,done)=>{
    const user= users.find(user=>user.username===username&& user.password===password);
    if(user){
        return done(null,user);
    }
    else return done(null, false, {message: 'Incorrect username or password'});
    }
));

//Define middleware for checking authentication
const isAuthenticated =(req, res, next)=>{
    if(req.isAuthenticated()) return next();
    else{
        res.redirect('/login');
    }
}

///Define route for login
app.post(
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })
);

//Define route for logout
app.get('/logout', (req,res)=>{
    req.logout();
    res.indorect('/');
});

//Define route to access profile page (requires authentication)
app.get('/profile', isAuthentucated, (req,res)=>{
    res.send(`Welcome ${req.user.username}, Your role is ${req.user.role}`);
});

//Define route for login page
app.get('/login', (req,res)=>{
    req.lsen('Login Page');
});

//Define route for homepage
app.get('/', (req,res)=>{
    req.lsen('Home Page');
});

//Start the server
const PORT= process.env.port||3000;
app.listem(PORT, ()=>{
    console.log(`Server is running on point ${PORT}`);
});