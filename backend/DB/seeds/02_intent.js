
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('intent').del()
    .then(function () {
      // Inserts seed entries
      return knex('intent').insert([
        {id: 1, intent_id: 'e295b918-996d-4396-952c-d11c02c02928', intent: 'S1_L1_ST1_E1', suggestions: 'Happy, Sad, Afraid', image_urls: '1-NOISE.png'},
        {id: 2, intent_id: '5c22d783-1b31-4967-afdd-da4e9aeb2d28', intent: 'S1_L1_ST1_E2_wrong_fallback', suggestions: 'Happy, Sad, Afraid', image_urls: '1-NOISE.png'},
        {id: 3, intent_id: '08c56b5c-0b52-4452-a4d4-4564c52fb26f', intent: 'S1_L1_ST1_E2_correct', suggestions: 'Yes, No, Maybe', image_urls: '2-DUVET.png'},
        {id: 4, intent_id: '7ace83b5-b161-4f4c-a745-0e7f20b9afe5', intent: 'S1_L1_ST1_E3_wrong_fallback', suggestions: 'Yes, No, Maybe', image_urls: '2-DUVET.png'},
        {id: 5, intent_id: '824923f1-c6b4-487b-a9a5-1adedc2460be', intent: 'S1_L1_ST1_E3_correct', suggestions: 'Hide, Laugh, Cry', image_urls: '2-DUVET.png'},
      ]);
    });
};
