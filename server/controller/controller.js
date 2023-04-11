var Userdb = require('../model/model')

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: "Content can not be empty!"})
        return
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user on mondodb
    user.save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occured while creating a create operation"})
        })
}

exports.find = (req, res) => {
    const id = req.query.id
    if(id) {
        Userdb.findById(id)
            .then(user => {
                if(!user) {
                    res.status(404).send({message: "Not found user with this id - " + id })
                }
                else {
                    res.send(user)
                }
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error in retrieving with id" + id})
            })
    }

    else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retriving user information"})
        })   
    }
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message: "Data to Update can't be empty"})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `cannot update user with id ${id}, Maybe user is not found`})
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in updating user information"})
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    console.log("reqID", req.params)
    Userdb.findByIdAndDelete(id, req.body)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `cannot delete user with id ${id}, May be user is not found`})
            }
            else {
                res.send(data)
            }
        })
        .catch (err => {
            res.status(500).send({message: "error in deleting user information"})
        })
}