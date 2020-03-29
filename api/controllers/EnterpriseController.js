/**
 * EnterpriseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all enterprise
    json: async function (req, res) {

        var enterprises = await Enterprise.find();

        return res.json(enterprises);
    },
    // create new account
    signup: async function (req, res) {
        if (req.method == "POST") {
            _enterprise = {};
            sails.bcrypt = require('bcryptjs');
            const saltRounds = 10;
            const hash = await sails.bcrypt.hash(req.query.password, saltRounds);
            if (req.query.email == "")
            return res.send("Null input: email");
            if (req.query.password == "")
            return res.send("Null input: password");
            if (req.query.name == "")
            return res.send("Null input: name");
            var check_email = await Enterprise.findOne({ email: req.query.email });
            if (!check_email){
                
            }else{
                return res.send("Email is taken");
            }
            _enterprise.email = req.query.email;
            _enterprise.password = hash;
            _enterprise.name = req.query.name;
            // _enterprise.industry = req.query.industry;
            var model = await Enterprise.create(_enterprise).fetch();
            if (!model) {
                return res.send("Cannot create!");
            }
            return res.send("Successfully Created!");
        }
    },
    // login function
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
                    return res.send(req.session.uid);
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
            if (req.query.uid == null) {
                return res.send("Log in first!");
            }
            var new_name = req.query.name;
            var new_industry = req.query.industry;
            await Enterprise.update({ id: req.query.uid }).set({
                "name": new_name, "industry": new_industry
            })
            return res.send("Successfully updated!");
        }
    },
    // view current user's info
    view: async function (req, res) {
        // var userid = req.query.id;
        // if (!req.session.uid)
        //     return res.send("Log in first!");
        // var model = await Enterprise.findOne(req.session.uid);
        var model = await Enterprise.findOne(req.query.id);
        if (!model) return res.send("Not Found");

        return res.json(model);

    },
    // add value to balance
    topup: async function(req, res){
        if (!req.session.uid)
            return res.send("Log in first!");
        var model = await Enterprise.findOne(req.session.uid);
        var topup_value = parseFloat(req.query.value);
        var new_value = model.balance + topup_value;
        await Enterprise.update({ id: req.session.uid }).set({
            "balance": new_value
        })
        return res.send("Top up successfully!")
    },
    // view tasks info
    viewtask: async function (req, res) {
        if (!req.session.uid)
            return res.send("Log in first!");
        var model = await Enterprise.findOne(req.session.uid).populate('has_task');
        if (!model) return res.notFound();

        return res.json(model.has_task);

    },
};

