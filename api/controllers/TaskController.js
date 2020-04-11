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
            console.log(req.query.latitude);
            console.log(req.query.longitude);
            _task.latitude = parseFloat(req.query.latitude);
            _task.longitude = parseFloat(req.query.longitude);
            _task.inspector_type = req.query.inspector_type;
            _task.inspector_no = parseInt(req.query.inspector_no);
            _task.reserved_no = 0;
            _task.completed_no = 0;
            _task.start_date = req.query.start_date;
            _task.end_date = req.query.end_date;
            _task.question_no = 0;
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
        var pay = parseInt(req.query.pay);
        var task = await Task.findOne(req.query.task_id);
        var question_no = parseInt(req.query.question_no);
        console.log(question_no);
        pay = pay + task.inspector_no *20;
            await Task.update({ id: req.query.task_id}).set({
                "pay": pay,
                "question_no": question_no
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
    },
    fetchTask: async function(req, res){
        // get inspector type 
        console.log(req.query.id);
        var model = await Inspector.findOne(req.query.id);
        if (!model) return res.notFound();
        var _type = model.employment_status;
        // get number of reserved tasks 
        var my_tasks_model = await Inspector.findOne(req.query.id).populate('has_task');
        if (!my_tasks_model) return res.notFound();
        console.log(my_tasks_model.has_task);
        var my_tasks_no = my_tasks_model.has_task.length;
        
        if (my_tasks_no <= 6){
            tasks = []
            no_preference_tasks = await Task.find({ inspector_type: "No Preference" });
            no_preference_tasks.forEach(function(item) {
                var check = false;
                my_tasks_model.has_task.forEach(function(own) {
                    if (own.id == item.id) check = true;
                });
                if (check == false) tasks.push(item);
            });
            // console.log(tasks);
            type_filter_tasks = await Task.find({ inspector_type: _type}); 
            type_filter_tasks.forEach(function(item) {
                var check = false;
                my_tasks_model.has_task.forEach(function(own) {
                    if (own.id == item.id) check = true;
                });
                if (check == false) tasks.push(item);
            });
            
            return res.json(tasks);
        }
        return res.send("No task");
    }
};

