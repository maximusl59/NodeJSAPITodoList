const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');
const todoRoute = require('./todo.route'); 
module.exports=(app)=>{
    app.get('/', function(req,res){
        res.send({
            'message':'Our first endpoint'
        });
    });

    app.use('/auth', authRoute);
    app.use('/profile', profileRoute);
    app.use('/todo', todoRoute);
}