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
  var enterprises = await Enterprise.find();


  if (await Inspector.count() <= 0) {
    await Inspector.create(
      { email: "emma@gmail.com", name: "emma", password: "12345", gender: "female", birth: "2/17/97", education: "Associate degree", employment_status: "Employed full time", balance: "1000", rating: "4.5" }
    );
  }
  var plans = await Plan.find();
  var samples = await Sample_Question.find();
  var inspectors = await Inspector.find();
  var tasks = await Task.find();

  // Sample_Question.findOne({id:"5e4172b977568c69fb65204c"}).exec(function (err, record){
  //   //record completely different
  //   console.log("oooooooo"+ record.content);
  // });
  // add sample association to plan
  // var i;
  // for (i = 1; i < samples.length; i++) {
  //   var tmp = "";
  //   if (i <= 4) {
  //     tmp = "Cleanliness & Appearance";
  //   } else if (i <= 16) {
  //     tmp = "Employee Behavior";
  //   } else if (i <= 22) {
  //     tmp = "Cashier Behavior";
  //   } else if (i <= 29) {
  //     tmp = "Path to Purchase";
  //   } else if (i <= 33) {
  //     tmp = "Food Quality";
  //   } else if (i <= 33) {
  //     tmp = "Food Accommodation";
  //   } else if (i <= 39) {
  //     tmp = "Restaurant Staff";
  //   } else {
  //     tmp = "Managment";
  //     // console.log(samples[i].id)
  //   }
  // await Plan.update(
  //   // Find all users with ULId = IC666
  //   { detail: "Management" },
  //   // Update their FHName and Ward fields
  //   { has_sample: samples[0]._id }
  // ).exec(function (err, plans) {
  //   // In case of error, handle accordingly
  //   if (err) { return res.serverError(err); }
  //   // Otherwise send a success message and a 200 status    
  //   return res.send('success');
  // });
  // console.log(tmp)
  // await Plan.update({ detail: "Food Quality" })
  //   .set({
  //     has_sample: samples[1].id
  //   })
  var samples = await Sample_Question.find().populate('belongs_plan');
  var plans = await Plan.find().populate('has_sample');

};
