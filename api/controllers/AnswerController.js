/**
 * AnswerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all answer
    json: async function (req, res) {

        var answers = await Answer.find();

        return res.json(answers);
    },
    create: async function (req, res) {
        if (req.method == "POST") {
            var question_id = req.query.question_id;
            _answer = {};
            _answer.content = req.query.content;
            _answer.inspector_id = req.session.uid;
            
            var model = await Answer.create(_answer).fetch();
            if (!model) {
                return res.send("Cannot create!");
            }
            await Answer.addToCollection(model.id, 'belongs_question').members(question_id);
            return res.send("Successfully Created!");
        }
    },
};

