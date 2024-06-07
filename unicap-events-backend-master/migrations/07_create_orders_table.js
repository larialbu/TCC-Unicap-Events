exports.up = function(knex) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('ticket_id').unsigned();
    table.foreign('ticket_id').references('id').inTable('tickets');
    table.decimal('total_value');
    table.string('payment_method').defaultTo('Boleto');
    table.enum('status_payment', ['Pendente', 'Pago', 'Cancelado']);
    table.datetime('payment_at').nullable();
    table.string('code').unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};
