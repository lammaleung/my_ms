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
};
