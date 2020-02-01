/**
 * InspectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function (req, res) {
        if (req.method == "POST") {
            Inspector.create(req.body.Inspector).exec(function (err, model) {
                return res.send("Successfully Created!");
            });
        } else {
            return res.view('inspector/create');
        }
    },
    login: function (req, res) {

        if (req.method == "GET")
            return res.view('Inspector/login');
        else {
            Inspector.findOne({ username: req.body.username }).exec(function (err, inspector) {
    
                if (inspector == null)
                    return res.send("No such user");
    
                if (inspector.password != req.body.password)
                    return res.send("Wrong Password");
    
                console.log("The session id " + req.session.id + " is going to be destroyed.");
    
                req.session.regenerate(function (err) {
    
                    console.log("The new session id is " + req.session.id + ".");
    
                    req.session.username = req.body.username;
    
                    return res.json(req.session);
    
                });
            });
        }
    },
    signup: function (req, res) {
        if (req.method == "POST") {
            Inspector.create(req.body.Inspector).exec(function (err, model) {
                return res.send("Sign Up Successfully!");
            });
        } else {
            return res.view('Inspector/signup');
        }
    },
    json: function (req, res) {
        console.log("hey");
        Inspector.find().exec(function (err, inspectors) {
            return res.json(inspectors);
        });
    },
};

