/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all task
    json: async function (req, res) {

        var tasks = await Task.find();
    
        return res.json(tasks);
    },
    // create new task
    create: async function (req, res) {
        if (req.method == "POST") {
            _task = {};
            _task.name = req.query.name;
            _task.address = req.query.address;
            _task.inspector_type = req.query.inspector_type;
            _task.industry = req.query.industry;
            _task.pay = req.query.pay;
            _task.date = req.query.date;
            
            var model = await Task.create(_task).fetch();
            if (!model) {
                return res.send("Cannot create!");
            }
            await Task.addToCollection(model.id, 'belongs_enterprise').members(req.session.uid);
            return res.send("Successfully Created!");
        }
    },
    
};

