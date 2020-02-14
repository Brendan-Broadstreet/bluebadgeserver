var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import("../models/test");

router.get("/test/helloclient", function (req, res) {
    res.send("Hello from helloclient")
})

router.post('/one', function (req, res) {
    res.send("Test 1 went through")
})

router.post('/two', function (req, res) {
    let data = "this is test data"
    TestModel.create({
        testdata: data,
        firstname: "Brendan"
    }).then(res.send('test data success'))
})

router.post('/three', function (req, res) {
    let newTestData = req.body.testdata
    TestModel.create({
        testdatatypes: newTestData
    }).then(res.send('test data success from test 3'))
})

router.post('/four', function (req, res) {
    var newTestData = req.body.testdata
    TestModel.create({
        testdatatypes: newTestData
    }).then(res.send('Test 4 went through!'))
})

router.post('/five', function (req, res) {
    var newTestData = req.body.testdata
    TestModel.create({
        testdatatypes: newTestData
    }).then(res.send('This is test 5!!'))
})

router.post('/six', function (req, res) {
    var newTestData = req.body.testdata
    TestModel.create({
        testdatatypes: newTestData
    }).then(res.json({
        testdata: testData
    })
    )
})

router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel.create({
            testdata: testData
        }).then(
            function createSuccess(testdata) {
                res.json({
                    testdata: testdata
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/one', function (req, res) {

    TestModel
        .findAll({ 
            attributes: ['id', 'testdatatypes']
        })
        .then(
            function findAllSuccess(data) {
                console.log("Controller data:", data);
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});



router.get('/', function (req, res) {
    res.send("Hey!! This is from the test route")
})

module.exports = router