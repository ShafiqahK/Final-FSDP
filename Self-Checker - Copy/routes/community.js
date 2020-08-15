const express = require("express");
const router = express.Router();
const CommCreate = require("../modelsCommunity/Create");
const CommFeedback = require("../modelsCommunity/Feedback");
const CommComments = require("../modelsCommunity/Comments");
const {Op} = require("sequelize")

router.get("/comm", (req, res) =>{
    CommCreate.findAll({
        raw: true
    }).then((create) => {
        res.render('./community/comm', {
            post: create,
        });
    }).catch(err => console.log(err));
});

router.post("/comm", (req, res) => {
    if ((req.body.filter != "All") && (req.body.search != "")){
        CommCreate.findAll({
            where: {[Op.and]: [{type: req.body.filter}, {title: {[Op.like]: "%" + req.body.search + "%"}}]}
        }).then((create) =>{
            res.render("./community/comm",{
                post: create
            });
        }).catch(err => console.log(err))
    }
    else if ((req.body.filter != "All") && (req.body.search == "")){
        CommCreate.findAll({
            where: {type: req.body.filter}
        }).then((create) => {
            res.render("./community/comm", {
                post: create
            });
        }).catch(err => console.log(err))
    }
    else if (req.body.search != ""){
        CommCreate.findAll({
            where:{title: {[Op.like]: "%" + req.body.search + "%"}}
        }).then((create) => {
            res.render('./community/comm', {
                post: create,
            });
        }).catch(err => console.log(err));
    }
    else{
        res.redirect("./comm")
    }
});

router.post("/create", (req,res) => {
    let {type, title, text} = req.body;
    let date = new Date().toLocaleDateString("en-SG");
    console.log(req.body);
    CommCreate.create({type, title, text, date})
    .then(
        res.redirect('./comm')
    ).catch(err => console.log(err));
        }
    )

router.get("/create", (req,res) =>{
    res.render("./community/create")
})

router.post("/feedback", (req,res) => {
    let {subject, feedback} = req.body;
    CommFeedback.create({subject, feedback}).then(feedback => {res.redirect("./comm")}).catch(err => console.log(err))
})

router.get("/feedback", (req,res) =>{
        res.render("./community/feedback");
});

router.get("/question/:id", (req,res) => {
    CommComments.findAll({ where: {questionID: req.params.id}}).then((comments) => {
        CommCreate.findOne({ where: {id: req.params.id}}).then((create) => {
            res.render("./community/post", {type: create.type, title: create.title, text: create.text, date: create.date ,id: create.id, commentDB: comments})
        })
    }).catch(err => console.log(err))
})

router.post("/question/:id", (req,res) => {
    let date = new Date().toLocaleDateString("en-SG");
    let comment = req.body.comment;
    let questionID = req.params.id;
    CommComments.create({questionID, comment, date}).then(
    CommComments.findAll({where: {questionID: req.params.id}})).then((comments) => {
        res.redirect("../question/" + questionID)
    })
})

module.exports = router;