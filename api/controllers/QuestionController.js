/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    json: async function (req, res) {

        var questions = await Question.find();

        return res.json(questions);
    },
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

};

