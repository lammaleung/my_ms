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
            _task.pay = 0;
            _task.inspector_type = req.query.inspector_type;
            _task.inspector_no = parseInt(req.query.inspector_no);
            _task.reserved_no = 0;
            _task.completed_no = 0;
            _task.start_date = req.query.start_date;
            _task.end_date = req.query.end_date;
            var model = await Task.create(_task).fetch();
            if (!model) {
                return res.send("Cannot create!");
            }
            await Task.addToCollection(model.id, 'belongs_enterprise').members(req.query.id);
            return res.send(model.id);
        }
    },
    addIndustry: async function (req, res){
        var new_industry = req.query.industry;
            await Task.update({ id: req.query.task_id}).set({
                "industry": new_industry
            })
        return res.send("Update succesfully.")
    },
    calculatePayment: async function(req, res){
        var pay = req.query.pay;
            await Task.update({ id: req.query.task_id}).set({
                "pay": pay
            })
        return res.send("Update succesfully.")
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
    }, 
    viewTask: async function(req, res){
        var model = await Task.findOne(req.query.task_id);
        if (!model) return res.send('No record');
        return res.json(model);
    }
};

