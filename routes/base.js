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
const getUserByName = require("../controllers/user/getUserByName");
const follow = require("../controllers/follow/follow");
const unFollow = require("../controllers/follow/unfollow");
const getMyLists = require("../controllers/list/getMyLists");
const appendToList = require("../controllers/list/appendItemToList");
const getList = require("../controllers/list/getListByUserandListName");
const getListsByUser = require("../controllers/list/getListsOfUser");
const addToWatchlist = require("../controllers/watchlist/addToWatchlist");
const addToFavourites = require("../controllers/favourites/appendItemToFavourites");
const addToWatched = require("../controllers/watched/addToWatched");
const removeFromWatchlist = require("../controllers/watchlist/removeFromWatchlist");
const removeFromFavourites = require("../controllers/favourites/removeItemFromFavourites");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const checkIfFavourite = require("../controllers/user/checkIfFavourite");
const checkIfInWatchlist = require("../controllers/user/checkIfInWatchlist");
const checkIfWatched = require("../controllers/user/checkIfWatched");
const getFollowerDetails = require("../controllers/user/getFollowerDetails");
const getFollowingDetails = require("../controllers/user/getFollowingDetails");
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

router.get('/followers/:username', async (req, res) => {
  let id = req.params.username
  id = id.split("%20").join(" ")
  const data = await getFollowerDetails(id)
  res.render('follower', {
    check: true,
    username: session.username,
    email: session.email,
    data: data,
    id: id
  })
})

router.get('/following/:username', async (req, res) => {
  let id = req.params.username
  id = id.split("%20").join(" ")
  const data = await getFollowingDetails(id)
  // console.log(id, data)
  res.render('following', {
    check: true,
    username: session.username,
    email: session.email,
    data: data,
    id: id
  })
})

router.get('/watchlist/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const user = await getUserByName(username)
  res.render("watchlist", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: user.planToWatch,
    userWatchList:  username,
    editable: false
  })
})

router.get('/watchedfilms/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const user = await getUserByName(username)
  res.render("watched_films", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: user.watched,
    userWatchList:  username,
    editable: false
  })
})

router.get('/addtowatchlist/:id', async (req, res) => {
  let id = req.params.id

  await addToWatchlist(id)
  res.redirect('/film/'+id)
})

router.get('/removefromwatchlist/:id', async (req, res) => {
  let id = req.params.id

  await removeFromWatchlist(id)
  res.redirect('/film/'+id)
})

router.get('/addtofavs/:id', async (req, res) => {
  let id = req.params.id

  await addToFavourites(id)
  res.redirect('/film/'+id)
})

router.get('/removefromfavs/:id', async (req, res) => {
  let id = req.params.id

  await removeFromFavourites(id)
  res.redirect('/film/'+id)
})

router.get('/addtowatched/:id', async (req, res) => {
  let id = req.params.id

  await addToWatched(id)
  res.redirect('/film/'+id)
})

router.get('/removefromwatched/:id', async (req, res) => {
  let id = req.params.id

  await removeFromWatched(id)
  res.redirect('/film/'+id)
})

// router.get('/watched/:username', async (req, res) => {
//   let username = req.params.username
//   username = username.split("%20").join(" ")
//   console.log(username)

//   const user = await getUserByName(username)
//   res.render("watchlist", {
//     check: session.isLoggedIn,
//     username: session.username,
//     email: session.email,
//     data: user.watched,
//     userWatchList: username,
//   })
// })

router.get('/lists/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const lists = await getListsByUser(username)
  res.render('otherUser_list', {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    lists: lists,
    usernameList: username
  })
})

router.get("/list/:username/:listName", async (req, res) => {
  let username = req.params.username
  let listName = req.params.listName;
  listName.split("%20").join(" ") ;

  const list = await getList(username, listName);
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: list,
    heading: "CREATED BY " + list.createdBy,
    time: "Created On " + list.createdAt.slice(0, 15),
    isTrending: false,
    listHeading: list.listName,
  });
});

router.get("/success", (req, res) => {
  res.render("success");
});

router.get("/bookingdetails/:id", (req, res) => {
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

router.get('/profile/:name', async (req, res) => {
  const name = req.params.name.split("%20").join(" ") 
  if (name == session.username) {
    res.redirect('/user/profile')
    return
  } 
  const user = await getUserByName(name)
  console.log(user)
  res.render("othersProfile", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    currentUser: false,
    data: user.user,
    listLength: user.listLength
  });
})

router.post('/profile/follow/:name', follow)

router.post('/profile/unfollow/:name', unFollow)

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
  const isFavourite = await checkIfFavourite(id)
  const isWatchlist = await checkIfInWatchlist(id)
  const isWatched = await checkIfWatched(id)
  if (session.username === "") lists = []
  else lists = await getMyLists() 
    res.render("film", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: movieData,
    cast: cast,
    watchProviders: watch.results.IN,
    reviews: reviews,
    errorReview: "",
    similar: similar,
    lists: lists,
    isFavourite: isFavourite,
    isWatched: isWatched,
    isWatchlist: isWatchlist
  });
});

router.get("/list/add/:listName/:id", async (req, res) => {
  let listName = req.params.listName
  listName = listName.split("%20").join(" ") 
  const id = req.params.id
  const result = await appendToList(listName, id)

  res.redirect('/user/list/'+listName)
})

router.post("/film/:id", addReview)

module.exports = router;
