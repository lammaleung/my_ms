/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  // 
  const hash = await sails.bcrypt.hash('123456', saltRounds);
  // var enterprises = await Enterprise.find();
  // var plans = await Plan.find();
  // var samples = await Sample_Question.find();
  // var inspectors = await Inspector.find();
  // var tasks = await Task.find();
  var samples = await Sample_Question.find().populate('belongs_plan');
  var plans = await Plan.find().populate('has_sample');

};
