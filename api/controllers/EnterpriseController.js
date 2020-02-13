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
        if (req.method == "POST") {
            Enterprise.findOne({ email: req.query.email }).exec(function (err, enterprise) {
                // sails.log.debug(req.query.email);
                // sails.log.debug("check: " + enterprise);
                if (enterprise == null)
                    return res.send("No such user");
                // Load the bcrypt module
                var bcrypt = require('bcryptjs');
                // // Generate a salt
                var salt = bcrypt.genSaltSync(10);
                if (!bcrypt.compareSync(req.query.password, enterprise.password))
                    return res.send("Wrong Password");
                console.log("The session id " + req.session.id + " is going to be destroyed.");
                req.session.regenerate(function (err) {
                    console.log("The new session id is " + req.session.id + ".");
                    //save to cookies
                    req.session.uid = enterprise.id;
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
    // update function
    update: async function (req, res) {
        if (req.method == "POST") {
            if (req.session.email == null){
                return res.send("Log in first!");
            }
            var new_name = req.query.name;
            var new_industry = req.query.industry;
            await Enterprise.update({ email: req.session.email }).set({
                "name": new_name, "industry": new_industry 
            })
            return res.send("Successfully updated!");
        }
    },
    view: async function (req, res) {

        var model = await Inspector.findOne(req.query.id);

        if (!model) return res.notFound();

        return res.json(model);

    },
};

