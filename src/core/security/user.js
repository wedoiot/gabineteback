'use strict'

var User = require('../../models/security/user');

const verifyUser = (params) => {
    return new Promise((resolve,reject) => {
        var user = setUser(params);
        user.save((err,userStored) =>{
            if(err){
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            userStored.salt = undefined;
            userStored.hash = undefined;
            resolve(userStored)
        })
    })
}

const authenticate = (params) => {
    return new Promise((resolve,reject) => {
        var userLogin = setUserLogin(params);
        if(userLogin.username && userLogin.password){
            User.findOne({$or:[{username: userLogin.username.toLowerCase()},{email: userLogin.username.toLowerCase()}]}).exec((err, userLoad) =>{
                if(err) reject(err);
                if(userLoad){
                    if(userLoad.validPassword(userLogin.password)){
                        const token = userLoad.generateJWT();
                        userLoad.hash = undefined;
                        userLoad.salt = undefined;
                        //add list menu of user
                        var obj = {
                            token : token,
                            user: userLoad
                        }
                        resolve(obj);
                    }
                }
                resolve(null)
            });
        }
    })
}

function setUserLogin(params) {
    const login ={
        username: params.username,
        password: params.password
    }
    return login
}

function setUser(params) {
    var user = new User()
    user.name = params.name;
    user.surname = params.surname;
    user.username = params.username;
    user.email = params.email;
    user.role = params.role;
    user.setPassword(params.password);

    return user;
}

module.exports  = {
    verifyUser,
    authenticate
}