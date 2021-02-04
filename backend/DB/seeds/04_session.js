
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('session').del()
    .then(function () {
      // Inserts seed entries
      return knex('session').insert([
      ]);
    });
};
