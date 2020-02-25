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
    getTask: async function (req, res) {
        var tasks = await Task.find();
        var start_pt = req.query.start;
        var limit = req.query.limit;
        var filter_tasks = [];
        var i;
        var end_pt = Math.min(tasks.length, limit)
        for (i = start_pt; i < end_pt; i++) {
            filter_tasks.push(tasks[i]);
        }
        
        return res.json(filter_tasks);
    }
};

