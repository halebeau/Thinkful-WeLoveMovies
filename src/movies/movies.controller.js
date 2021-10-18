const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

//middleware
const _paramsCheck = async (req, res, next) => {
  const { movieId } = req.params;
  const match = await service.read(Number(movieId));
  if (match.length === 0 || !movieId)
    return next({
      status: 404,
      message: `movieId: ${movieId} does not exist in the database`,
    });
  res.locals.movie = match[0];
  next();
};

//executive functions

async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing
    ? await (await service.listShowing()).splice(0, 15)
    : await service.list();

  res.status(200).json({ data: data });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);
  res.status(200).json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(_paramsCheck), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listTheaters),
  ],
};
