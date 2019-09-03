exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("score")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("score").insert([
        { score: "1500", id_user: "2" },
        { score: "2500", id_user: "1" },
        { score: "3500", id_user: "3" },
        { score: "4500", id_user: "4" },
        { score: "1500", id_user: "5" },
        { score: "2500", id_user: "3" },
        { score: "3500", id_user: "2" }
      ]);
    });
};
