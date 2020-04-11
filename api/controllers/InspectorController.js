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
            _notification = {};
            _notification.title = "New to WeTell";
            _notification.details = "Welcome to WeTell! In WeTell, you are able to earn money online. Please check out the functions!";
            var notification_model = await Notification.create(_notification).fetch();
            if (!notification_model) {
                // return res.send("Cannot create!");
                console.log("cannot create notification");
            }
            await Inspector.addToCollection(model.id, 'has_notification').members(notification_model.id);
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
            var new_name = req.query.name;
            var new_gender = req.query.gender;
            var new_birth = req.query.birth;
            var new_education = req.query.education;
            var new_employment_status = req.query.employment_status;
            await Inspector.update({ id: req.query.uid }).set({
                "name": new_name, 
                "gender": new_gender,
                "birth": new_birth,
                "education": new_education,
                "employment_status": new_employment_status
            })
            // print("yes");
            return res.send("Successfully updated!");
        }
    },
    // view current user's info
    view: async function (req, res) {
        var model = await Inspector.findOne(req.query.id);
        if (!model) return res.send("Not Found");
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
    },
    viewtask: async function (req, res) {
        // if (!req.session.uid)
        //     return res.send("Log in first!");
        var model = await Inspector.findOne(req.query.id).populate('has_task');
        if (!model) return res.notFound();
        return res.json(model.has_task);

    },
    viewtaskLength: async function (req, res) {
        // if (!req.session.uid)
        //     return res.send("Log in first!");
        var model = await Inspector.findOne(req.query.id).populate('has_task');
        if (!model) return res.notFound();
        // console.log(model.has_task);
        var task_no = model.has_task.length.toString();
        
        return res.send(task_no);

    },
    reserveTask: async function (req, res){
        // console.log(req.query.id);
        // console.log(req.query.task_id);
        var model = await Task.findOne(req.query.task_id);
        if(model.reserved_no>=model.inspector_no) return res.send("Out of quota");
        var new_reserved_no = model.reserved_no + 1;
        await Task.update({ id: req.query.task_id }).set({
            "reserved_no": new_reserved_no
        })
        // console.log(new_reserved_no);
        await Inspector.addToCollection(req.query.id, 'has_task').members(req.query.task_id);
        // await Task.addToCollection(model.id, 'belongs_enterprise').members(req.query.id);
        return res.send("Added");
    },
    giveupTask: async function (req, res){
        console.log(req.query.id);
        console.log(req.query.task_id);
        var model = await Task.findOne(req.query.task_id);
        // if(model.reserved_no>=model.inspector_no) return res.send("Out of quota");
        var new_reserved_no = model.reserved_no - 1;
        await Task.update({ id: req.query.task_id }).set({
            "reserved_no": new_reserved_no
        })
        console.log(new_reserved_no);
        await Inspector.removeFromCollection(req.query.id, 'has_task').members(req.query.task_id);
        return res.send("Removed");
    },
    
    viewtask: async function (req, res) {
        // if (!req.session.uid)
        //     return res.send("Log in first!");
        var model = await Inspector.findOne(req.query.uid).populate('has_task');
        if (!model) return res.notFound();
        return res.json(model.has_task);

    },
    getNotification: async function (req, res) {
        // if (!req.session.uid)
        //     return res.send("Log in first!");
        var model = await Inspector.findOne(req.query.uid).populate('has_notification');
        if (!model) return res.notFound();
        return res.json(model.has_notification);

    },
};
