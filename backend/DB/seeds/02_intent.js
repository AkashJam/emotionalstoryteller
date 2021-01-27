
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('intent').del()
    .then(function () {
      // Inserts seed entries
      return knex('intent').insert([
        {id: 1, intent_id: 'e295b918-996d-4396-952c-d11c02c02928', intent: 'S1_L1_ST1_E1', suggestions: 'Happy, Sad, Afraid', image_urls: '1-NOISE.png'},
      ]);
    });
};
