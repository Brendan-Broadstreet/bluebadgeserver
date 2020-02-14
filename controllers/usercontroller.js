var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/createuser', function (req, res) {
    var userName = req.body.user.username;
    var password = req.body.user.password;

    User.create({
        username: userName,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createErrror(err) {
            res.send(500, err);
        }
    );
})

router.post('/login', function (req, res) {
    User.findOne({
        where: { username: req.body.user.username }
    }).then(
        function(user){
        if(user) {
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                if(matches){
                    var token=jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: "successfully authenticated",
                        sessionToken: token
                    });
        } else {
            res.status(502).send({ error: "You Failed, Yo" });
        }
    })
        } else {
            res.status(500).send({ error: "Failed to Authenticate" });
        }
    },
    function(err){
        res.status(501).send({error:"You Failed, Yo"});
    }
    );
});

module.exports = router