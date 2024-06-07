exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {name: 'Evento 1', description: 'Descrição do evento 1', start_date: new Date(), end_date: new Date()},
        {name: 'Evento 2', description: 'Descrição do evento 2', start_date: new Date(), end_date: new Date()},
        // Adicione mais eventos falsos aqui, se necessário
      ]);
    });
};
