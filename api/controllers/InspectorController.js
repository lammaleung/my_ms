/**
 * InspectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all inspector
    json: async function (req, res) {
        var inspectors = await Inspector.find();
        return res.json(inspectors);
    },
    // sign up for new account
    signup: async function (req, res) {
        if (req.method == "POST") {
            _inspector = {};
            sails.bcrypt = require('bcryptjs');
            const saltRounds = 10;
            const hash = await sails.bcrypt.hash(req.query.password, saltRounds);
            _inspector.email = req.query.email;
            _inspector.password = hash;
            _inspector.name = req.query.name;
            var model = await Inspector.create(_inspector).fetch();
            if (!model) {
                return res.send("Cannot create!");
            }
            return res.send("Successfully Created!");
        }
    },
    // log in function
    login: function (req, res) {
        if (req.method == "POST") {
            Inspector.findOne({ email: req.query.email }).exec(function (err, inspector) {
                // sails.log.debug(req.query.email);
                // sails.log.debug("check: " + Inspector);
                if (inspector == null)
                    return res.send("No such user");
                // Load the bcrypt module
                var bcrypt = require('bcryptjs');
                // // Generate a salt
                var salt = bcrypt.genSaltSync(10);
                if (!bcrypt.compareSync(req.query.password, inspector.password))
                    return res.send("Wrong Password");
                console.log("The session id " + req.session.id + " is going to be destroyed.");
                req.session.regenerate(function (err) {
                    console.log("The new session id is " + req.session.id + ".");
                    //save to cookies
                    req.session.uid = inspector.id;
                    req.session.email = req.query.email;
                    return res.send("login successfully.");
                });
            });
        }
    },
    // logout function
    logout: function (req, res) {
        console.log("The current session id " + req.session.id + " is going to be destroyed.");
        req.session.destroy(function (err) {
            return res.send("Log out successfully.");
        });
    },
    // update function
    update: async function (req, res) {
        if (req.method == "POST") {
            if (req.session.uid == null) {
                return res.send("Log in first!");
            }
            var new_name = req.query.name;
            var new_gender = req.query.gender;
            var new_birth = req.query.birth;
            var new_education = req.query.education;
            var new_occupation = req.query.occupation;
            await Inspector.update({ id: req.session.uid }).set({
                "name": new_name, 
                "gender": new_gender,
                "birth": new_birth,
                "education": new_education,
                "occupation": new_occupation
            })
            return res.send("Successfully updated!");
        }
    },
    // view current user's info
    view: async function (req, res) {
        if (!req.session.uid)
            return res.send("Log in first!");
        var model = await Inspector.findOne(req.session.uid);

        if (!model) return res.notFound();

        return res.json(model);

    },
    // add value to balance
    getpaid: async function(req, res){
        if (!req.session.uid)
            return res.send("Log in first!");
        var model = await Inspector.findOne(req.session.uid);
        var topup_value = parseFloat(req.query.value);
        var new_value = model.balance + topup_value;
        await Inspector.update({ id: req.session.uid }).set({
            "balance": new_value
        })
        return res.send("Get paid successfully!")
    }
};
