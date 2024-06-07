exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('certificates').del()
    .then(function () {
      // Inserts seed entries
      return knex('certificates').insert([
        { 
          user_id: 1, 
          sub_event_id: 1, 
          created_at: new Date(), 
          verification_code: 'abc123' 
        },
        { 
          user_id: 2, 
          sub_event_id: 2, 
          created_at: new Date(), 
          verification_code: 'def456' 
        },
        // Adicione mais certificados falsos aqui, se necessário
      ]);
    });
};
