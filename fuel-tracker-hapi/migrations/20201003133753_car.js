exports.up = function (knex) {
  return knex.schema.createTable('car', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('tankSize').unsigned();
    table.integer('currentFuelLevel').unsigned();
    table.integer('tripState').unsigned();
    table.integer('fuelPercent').unsigned().defaultTo(0);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('car');
};
