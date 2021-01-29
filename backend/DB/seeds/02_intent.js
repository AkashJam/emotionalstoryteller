
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
        {id: 5, intent_id: '824923f1-c6b4-487b-a9a5-1adedc2460be', intent: 'S1_L1_ST1_E3_correct', suggestions: 'Hide, Laugh, Look under the bed, Cry', image_urls: '2-DUVET.png'},
        {id: 6, intent_id: '6c07c7ae-45df-4361-93bc-3ca73d6db395', intent: 'S1_L2_ST2_E4_call_parents', suggestions: 'Happy, Angry, Sad', image_urls: '2-DUVET.png'},
        {id: 7, intent_id: '85baea96-ba2e-4afb-aab1-286734f916c6', intent: 'S1_L2_ST2_E4_why', suggestions: 'Hide, Laugh, Look under the bed, Cry', image_urls: '2-DUVET.png', sadness: 'Peterwasscared', anger:'Peterwasbrave', fear:'Peterwasscared'},
        {id: 8, intent_id: '773cc0f5-ca2e-416a-8f0c-8dcceb36d29c', intent: 'S1_L2_ST3_E4_laugh', suggestions: 'Hide, Laugh, Look under the bed, Cry', image_urls: '2-DUVET.png'},
        {id: 9, intent_id: '158a3bbc-d713-4720-870c-d899900ed9a5', intent: 'S1_L2_ST2_E4_Look_bed', suggestions: 'Sing, Scream, Bite'},
        {id: 10, intent_id: 'bd5856db-8a5c-4c17-a323-a24dcd9825f4', intent: 'S1_L2_ST2_E4_who_is_there', suggestions: 'Happy, Angry, Sad'},
        {id: 11, intent_id: '3a6b21f3-fcad-4678-89f6-f300e517f85f', intent: 'S1_L2_ST2_E5_shout', suggestions: 'Sing, Scream, Bite'},
        {id: 12, intent_id: '847b6187-1240-44be-8167-13f8301bb2f7', intent: 'S1_L2_ST2_E5_why', suggestions: 'Sing, Scream, Bite', joy: 'Peterishappy'},
        {id: 13, intent_id: 'e7843e2e-1f93-44f9-934f-b571d3a73274', intent: 'S1_L2_ST2_E5_tell_joke', suggestions: 'Yes, No, Maybe'},
        {id: 14, intent_id: 'ad1ade29-25bb-48b3-833b-64e8f94efa23', intent: 'S1_L2_ST2_E5_sing_song', suggestions: 'Yes, No, Maybe'},
        {id: 15, intent_id: '2b188ebc-829d-4eaf-9373-fc6ea4da945c', intent: 'S1_L2_ST2_E5_default', suggestions: 'Yes, No, Maybe'},
        {id: 16, intent_id: '665cffaf-14ae-41f4-9eed-8092acf7f659', intent: 'S1_L2_ST3_E5_wrong_fallback', suggestions: 'Happy, Angry, Sad'},
        {id: 17, intent_id: '4a1fef61-b1a3-4010-adbb-4dcfa1191d4a', intent: 'S1_L2_ST3_E5_correct', suggestions: 'Laugh, Talk, Cry, Sleep'},
        {id: 18, intent_id: '485f171e-d147-4e30-b9ce-cd98c950684e', intent: 'S1_L2_ST3_E6_laugh', suggestions: 'Laugh, Talk, Cry, Sleep'},
        {id: 19, intent_id: '28875851-7cd8-4f2b-808c-1490ce9709ab', intent: 'S1_L2_ST3_E6_why', suggestions: 'Laugh, Talk, Cry, Sleep', sadness: 'Monsterissuprised', anger:'Monsterissuprised', fear:'Monsterissuprised', disgust:'Monsterissuprised'},
        {id: 20, intent_id: '7fdb91d0-e0f4-4bca-8f1d-8429449abdd8', intent: 'S1_L2_ST3_E6_call_parents', suggestions: 'Yes, No, Maybe'},
        {id: 21, intent_id: '0479e15a-6e0b-4c75-9b60-f2edb2dd1d58', intent: 'S1_L2_ST3_E6_argue', suggestions: 'Yes, No, Maybe'},
        {id: 22, intent_id: '0ca23f70-30b1-41d6-ac19-0db57383eb74', intent: 'S1_L2_ST3_E6_purpose', suggestions: 'Yes, No, Maybe'},
        {id: 23, intent_id: '5a62de39-3229-4039-a9c1-a58dd496c93c', intent: 'S1_L2_ST3_E6_default', suggestions: 'Yes, No, Maybe'},
      ]);
    });
};
