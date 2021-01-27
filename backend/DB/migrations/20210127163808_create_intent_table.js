
exports.up = function(knex, Promise) {
    return knex.schema.createTable('intent', function(table) {
        table.increments();
        table.string('intent_id').notNullable();
        table.string('intent').notNullable();
        table.string('suggestions');
        table.string('image_urls');
        table.string('joy');
        table.string('sadness');
        table.string('fear');
        table.string('anger');
        table.string('disgust');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('intent');
};
