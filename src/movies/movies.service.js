const db = require("../db/connection");

function list() {
  return db("movies");
}

function listShowing() {
  return db("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return db("movies").where({ movie_id: movieId });
}

function getCritics(criticId) {
  return db("critics").where({ critic_id: criticId });
}

function listReviews(movieId) {
  return db("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .where({ "m.movie_id": movieId });
}

function listTheaters(movieId) {
  return db("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

module.exports = {
  list,
  listShowing,
  read,
  getCritics,
  listReviews,
  listTheaters,
};
