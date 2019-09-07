exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 128)
      .notNullable()
      .unique();

    users.string("password", 128).notNullable;

    users
      .string("img", 128)
      .defaultTo(
        "https://cdn2.iconfinder.com/data/icons/user-icon-2-1/100/user_5-15-512.png"
      )
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
