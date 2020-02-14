let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let listModel = sequelize.import('../models/lists');

router.post('/', function (req, res) {
    var owner = req.user.id;
    var description = req.body.list.description;
    var wic = req.body.list.wic;


    listModel.create({
        description: description,
        wic: wic,
        owner: owner
    })
        .then(
            function createSuccess(response) {
                res.json({
                    message: 'success',
                    added: response
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

router.get("/", function (req, res) {
    var userid = req.user.id;
    listModel.findAll({
        where: { owner: userid },
        order: [["id", "ASC"]]
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.get("/getall", function (req, res) {
    let userid = req.user.id
    listModel.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        }
    );
});

router.post('/', function (req, res) {
    let description = req.body.list.description;
    let wic = req.body.list.wic;
    let owner = req.user.id
    listModel.create({
        description: description,
        wic: wic,
        owner: owner
    }).then(
        function createSuccess(response) {
            res.json({
                message: 'success',
                added: response
            })
        }, function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.delete('/delete/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    listModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Item was deleted')
            : res.send('Nothing deleted');
    }),
        err => res.send(500, err.message);
});

router.get('/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    LogModel.findOne({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        data ? res.json(data) : res.send('Not Authorized to view item');
    }),
        err => res.send(500, err.message);
});

router.put('/update/:id', function (req, res) {
    let userid = req.user.id;
    let primaryKey = req.params.id;
    let description = req.body.list.description;
    let wic = req.body.list.wic;
    listModel.update({
        description: description,
        wic: wic,
    }, { where: { id: primaryKey, owner: userid } }
    ).then(
        data => {
            return data > 0
                ? res.send("Item updated!")
                : res.send("No updates where made.")
        }),
        err => res.send(500, err.message)
})




module.exports = router