exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sub_events').del()
    .then(function () {
      // Inserts seed entries
      return knex('sub_events').insert([
        { 
          name: 'SubEvento 1', 
          description: 'Descrição do SubEvento 1', 
          start_date: new Date(), 
          end_date: new Date(), 
          event_id: 1, 
          value: 10.99, 
          quantity: 100 
        },
        { 
          name: 'SubEvento 2', 
          description: 'Descrição do SubEvento 2', 
          start_date: new Date(), 
          end_date: new Date(), 
          event_id: 2, 
          value: null, 
          quantity: 50 
        },
        // Adicione mais subeventos falsos aqui, se necessário
      ]);
    });
};
