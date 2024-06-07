exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { 
          user_id: 1, 
          ticket_id: 1, 
          total_value: 50.00, 
          payment_method: 'Boleto', 
          status_payment: 'Pendente', 
          payment_at: null, 
          code: 'ORD123' 
        },
        { 
          user_id: 2, 
          ticket_id: 2, 
          total_value: 75.00, 
          payment_method: 'Boleto', 
          status_payment: 'Pago', 
          payment_at: new Date(), 
          code: 'ORD456' 
        },
        // Adicione mais pedidos falsos aqui, se necessário
      ]);
    });
};
