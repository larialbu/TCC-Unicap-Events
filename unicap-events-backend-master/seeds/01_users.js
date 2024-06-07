exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {name: 'João', email: 'joao@example.com', password: '123456', phone: '123456789', type: 'Estudante', permission: "Administrador"},
        {name: 'Maria', email: 'maria@example.com', password: '654321', phone: '987654321', type: 'Professor', permission: "Organizador"}
      ]);
    });
};
