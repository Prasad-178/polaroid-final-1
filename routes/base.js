const { Router } = require("express");
const session = require("../session/session");
const router = Router();
const getLatestMovies = require("../api/getTrendingMovies");
const getNowPlaying = require("../api/getNowPlaying");
const getUpcoming = require("../api/getUpcoming");
const getTrendingThisWeek = require("../api/getTrendingThisWeek");
const getMovieById = require("../api/getMovieById");
const getMovieCredits = require("../api/getMovieCredits");
const getWatchProviders = require("../api/getWatchProviders");
const getMovieByName = require("../api/getMovieByName");
const getReviews = require("../controllers/reviews/getReviewsAndRating");
const addReview = require("../controllers/reviews/addReview");
const getSimilarMovies = require("../api/getSimilarMovies");
const getRecentLists = require("../controllers/list/getRecentLists");
const getTrendingMovies = require("../api/getTrendingMovies");
const getTrendingListsToday = require("../api/getTrendingLists").day;
const getTrendingListsthisWeek = require("../api/getTrendingLists").week;

// router.use('/', check)

router.get(
  "/list, username: session.username, email: session.emailsearch",
  (req, res) => {
    res.render("list_search", {
      check: session.isLoggedIn,
      username: session.username,
      email: session.email,
    });
  }
);

router.get("/lists", async (req, res) => {
  const lists = await getRecentLists()
  res.render("lists", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    lists: lists
  });
});

router.get("/booking", (req, res) => {
  res.render("booking", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get("/success", (req, res) => {
  res.render("success");
});

router.get("/bookingdetails", (req, res) => {
  res.render("bookingdetails", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get("/faq", (req, res) => {
  res.render("faq", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get("/payment", (req, res) => {
  res.render("payment", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get("/trending/week", async (req, res) => {
  const data = await getTrendingListsthisWeek()
  console.log(data)
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data,
    heading: "TRENDING THIS WEEK",
    time: "Updated 6h ago",
    isTrending: true,
    listHeading: "Movies Most Popular This Week"
  });
});

router.get("/trending/day", async (req, res) => {
  const data = await getTrendingListsToday()
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data,
    heading: "TRENDING TODAY",
    time: "Updated 6h ago",
    isTrending: true,
    listHeading: "Movies Most Popular Today"
  });
});

let latest;
let nowPlaying;
let upcomingData;
let popularThisWeek;

let dataObtained = false;

router.get("/", async (req, res) => {
  if (!dataObtained) {
    latest = await getLatestMovies();
    nowPlaying = await getNowPlaying();
    upcomingData = await getUpcoming();
    popularThisWeek = await getTrendingThisWeek();
    dataObtained = true;
  }
  res.render("polaroid", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    results: latest.results,
    playing: nowPlaying.results,
    upcoming: upcomingData.results,
    popular: popularThisWeek.results,
  });
});

router.get("/about", (req, res) => {
  res.render("aboutus", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get("/films", async (req, res) => {
  const nowPlaying = await getNowPlaying()
  const trendingMovies = await getTrendingMovies()
  const upcoming = await getUpcoming()
  res.render("films", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    upcoming: upcoming,
    nowPlaying: nowPlaying,
    trendingMovies: trendingMovies
  });
});

router.post("/bookingdetails", (req, res) => {
  res.redirect("/booking");
});

router.post("/booking", (req, res) => {
  res.redirect("/payment");
});

router.get("/film/:id", async (req, res) => {
  const id = req.params.id
  const movieData = await getMovieById(id);
  const cast = await getMovieCredits(id);
  const watch = await getWatchProviders(id);
  const reviews = await getReviews(id)
  const similar = await getSimilarMovies(id)
    res.render("film", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: movieData,
    cast: cast,
    watchProviders: watch.results.IN,
    reviews: reviews,
    errorReview: "",
    similar: similar
  });
});

router.post("/film/:id", addReview)

module.exports = router;
