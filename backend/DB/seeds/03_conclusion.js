
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('conclusion').del()
    .then(function () {
      // Inserts seed entries
      return knex('conclusion').insert([
        {id: 1, conclusion_name: 'Happy Suggestion', event_name: 'suggestjoy', section_name: 'HAPPY-STORY'},
        {id: 2, conclusion_name: 'Angry Suggestion', event_name: 'suggestanger', section_name: 'ANGRY-STORY'},
        {id: 3, conclusion_name: 'Scared Suggestion', event_name: 'suggestfear', section_name: 'SCARY-STORY'},
        {id: 4, conclusion_name: 'Continue', event_name: 'continue', section_name: 'continue'},
      ]);
    });
};
