const axios = require('axios') // MY Understanding: Axios is used when server is making calls to external API[MongoDB here]
                               // While AJAX is used by server to handle the query that are made by client browser. 

exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            res.render('index', {users: response.data})        
        })
        .catch(err => {
            res.send(err)
        })
}

exports.add_user = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
        .then(userdata => {
            res.render('update_user', {user: userdata.data})
        })
        .catch(err => {
            res.send(err)
        })
}
exports.delete_user = (req, res) => {
    axios.delete('http://localhost:3000/api/users', {params: {id: req.query.id}})
        .then(userdata => {
            res.render('update_user', {user: userdata.data})
        })
        .catch(err => {
            res.send(err)
        })
}