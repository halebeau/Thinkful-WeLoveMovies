const db = require("../db/connection");

function list() {
  return db("reviews");
}

function read(reviewId) {
  return db("reviews").where({ review_id: reviewId });
}

function update(updatedReview, reviewId) {
  return db("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update({ ...updatedReview, updated_at: db.fn.now() })
    .then((updatedRecords) => updatedRecords[0]);
}

function getCritic(criticId) {
  return db("critics").where({ critic_id: criticId }).select();
}

function destroy(reviewId) {
  return db("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  getCritic,
  destroy,
};
