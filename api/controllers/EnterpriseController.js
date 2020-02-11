/**
 * EnterpriseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    json: async function (req, res) {

        var enterprises = await Enterprise.find();
    
        return res.json(enterprises);
    },
    login: function (req, res) {
        if (req.method == "POST"){
            // sails.log.debug(req.param('email'));
            // sails.log.debug(req.param('password'));
            Enterprise.findOne({ email: req.query.email }).exec(function (err, enterprise) {
                sails.log.debug(req.query.email);
                if (enterprise == null)
                    return res.send("No such user");
                // if (user.password != req.body.password)
                // return res.send("Wrong Password");

                // Load the bcrypt module
                // var bcrypt = require('bcryptjs');
                // // Generate a salt
                // var salt = bcrypt.genSaltSync(10);
                // //  if (user.password != req.body.password)
                // if (!bcrypt.compareSync(req.body.password, user.password))
                //     return res.send("Wrong Password");
                if (enterprise.password != req.query.password)
                    return res.send("Wrong Password");
                console.log("The session id " + req.session.id + " is going to be destroyed.");
                req.session.regenerate(function (err) {
                    console.log("The new session id is " + req.session.id + ".");
                    //save to cookies
                    // req.session.uid = enterprise.id;
                    req.session.email = req.query.email;
                    return res.send("login successfully.");
                });
            });
        }
    },
    logout: function (req, res) {
        console.log("The current session id " + req.session.id + " is going to be destroyed.");
        req.session.destroy(function (err) {
            return res.send("Log out successfully.");
        });
    },
    view: async function (req, res) {

        var model = await Inspector.findOne(req.params.id);
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },
};

