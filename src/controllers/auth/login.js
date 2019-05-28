const { generateError, generateResponse} = require('../../response');
const { authenticate } = require('../../core/security/user');

async function login(req,res){
    let params = req.body;

    try{
        var response = await authenticate(params);
        if(response == null){
            return res.status(200).send(generateResponse(null, "Credenciales incorrectas"));
        }
        else{
            return res.status(200).send(generateResponse(response,`Bienvenido ${response.user.username}`));
        }
    }
    catch(error){
        return res.status(500).send(generateError(error));
    }
}

async function isTokenValid(req,res) {
    res.status(200).send(generateResponse(true,"el token es valido!"));
}

module.exports = {
    login,
    isTokenValid,
}