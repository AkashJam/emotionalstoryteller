
exports.up = function(knex, Promise) {
    return knex.schema.createTable('session', function(table) {
        table.string('session_id').notNullable();
        table.string('user_responses');
        table.string('sections');
        table.integer('conclusion_no');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('session');
};