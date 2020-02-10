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

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  if (await Inspector.count() <= 0) {
    await Inspector.create(
      { email: "emma@gmail.com", name: "emma", password: "12345", gender: "female", birth: "2/17/97", education: "Associate degree", employment_status: "Employed full time", balance: "1000", rating: "4.5" }
    );
  }
  // return res.ok();
  // var inspectors = [
  //   { email : "admin", password: "123456", gender: "male", id: 101 },
  //   { email: "boss", password: "123456", gender: "female",id: 102 }
  // ];

  // inspectors.forEach(function (inspector) {
  //   Inspector.create(inspector).exec(function (err, model) { });
  // });
  var plans = await Plan.find();
  var samples = await Sample_Question.find();
  var inspectors = await Inspector.find();
  var tasks = await Task.find();
  await Inspector.update(
    { name: "emma" },
    { has_task: tasks[0].id }
  )
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
  //   await Plan.update(
  //     // Find all users with ULId = IC666
  //     { detail: "Management" },
  //     // Update their FHName and Ward fields
  //     { has_sample: samples[0]._id }
  //   ).exec(function(err, plans) {
  //     // In case of error, handle accordingly
  //     if(err) {return res.serverError(err);} 
  //     // Otherwise send a success message and a 200 status    
  //     return res.send('success');

  // });
  // console.log(tmp)
  await Plan.update({ detail: "Food Quality" })
    .set({
      has_sample: samples[1].id
    })
  var samples = await Sample_Question.find().populate('belongs_plan');
  var plans = await Plan.find().populate('has_sample');

};
