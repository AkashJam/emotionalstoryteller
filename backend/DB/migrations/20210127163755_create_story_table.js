
exports.up = function(knex, Promise) {
    return knex.schema.createTable('story', function(table) {
        table.increments();
        table.string('story_name').notNullable();
        table.string('event_name').notNullable();
        table.string('emotion').notNullable();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('story');
};
