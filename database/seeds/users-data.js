
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'user1'},
        {username: 'user2', password: 'user1'},
        {username: 'user3', password: 'user1'},
        {username: 'user4', password: 'user1'},
        {username: 'user5', password: 'user1'},
        {username: 'user6', password: 'user1'}
      ]);
    });
};
