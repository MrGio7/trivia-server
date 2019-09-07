exports.up = function(knex) {
  return knex.schema.createTable("score", score => {
    score.increments();

    score
      .integer("score")
      .notNullable()

    score
      .integer("id_user")
      .references("id")
      .inTable("users")
      .notNullable()
      .unsigned()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("score");
};
