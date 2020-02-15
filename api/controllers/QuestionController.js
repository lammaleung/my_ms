/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all question
    json: async function (req, res) {

        var questions = await Question.find();

        return res.json(questions);
    },
    // add questions by passing task id and question ids
    add: async function (req, res) {

        // var questions = await Question.find();
        if (req.method == "POST") {
            var taskId = req.query.task_id;
            // console.log(req.body)
            var models = await Question.createEach(req.body).fetch();
            if (models.length == 0) {
                return res.ok("No")
            }
            await Task.addToCollection(taskId, 'has_question').members(models.map(model => model.id));
        }
        return res.ok("Okay")
    },
    viewanswer: async function (req, res){
        var model = await Task.findOne(req.query.id).populate('has_answer');
        if (!model) return res.notFound();

        return res.json(model.has_answer);
    }
};

