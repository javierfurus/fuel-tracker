exports.up = function (knex) {
  return knex.schema.createTable('track', (table) => {
    table.increments('id').primary();
    table.timestamp('date');
    table.integer('tripState');
    table.enu('roadType', ['City', 'Highway', 'Motorway']);
    table.enu('gasType', ['OG 85 +', 'OG 90 +', 'Diesel']);
    table.integer('amountFilled');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('track');
};
