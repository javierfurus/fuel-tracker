exports.up = function (knex) {
  return knex.schema.createTable('track', table => {
    table.increments('id').primary();
    table.timestamp('date');
    table.integer('tripState');
    table.string('roadType');
    table.string('gasType');
    table.integer('amountFilled');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('track');
};
