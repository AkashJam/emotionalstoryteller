
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('story').del()
    .then(function () {
      // Inserts seed entries
      return knex('story').insert([
        {id: 1, story_name: 'Peter and the Monster', event_name: 'Monsterunderbed',emotion: 'fear'},
      ]);
    });
};
