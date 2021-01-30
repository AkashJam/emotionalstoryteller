
exports.up = function(knex, Promise) {
    return knex.schema.createTable('conclusion', function(table) {
        table.increments();
        table.string('conclusion_name').notNullable();
        table.string('event_name').notNullable();
        table.string('section_name').notNullable();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('conclusion');
};