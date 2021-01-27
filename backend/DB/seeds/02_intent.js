
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('intent').del()
    .then(function () {
      // Inserts seed entries
      return knex('intent').insert([
        {id: 1, intent_id: '84a31010-99d5-4cd5-ad54-3fdf8d429ded', intent: 'S1_L1_ST1_E1', suggestions: 'Happy, Sad, Afraid', image_urls: '1-NOISE.png'},
      ]);
    });
};
