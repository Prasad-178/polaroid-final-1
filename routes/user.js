const { Router } = require("express");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");
const register = require("../controllers/user/register");
const appendToList = require("../controllers/list/appendItemToList");
const createList = require("../controllers/list/createList");
const verifyToken = require("../middleware/verifyToken");
const session = require("../session/session");
const { email } = require("../session/session");
const getMyLists = require("../controllers/list/getMyLists");
const deleteList = require("../controllers/list/deleteList");
const getMyListByName = require("../controllers/list/getMyListByName");
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { error: "" });
});

router.get("/register", (req, res) => {
  res.render("register", { error: "" });
});

router.post("/login", login);

router.post("/register", register);

router.get('/watchlist', (req, res) => {
    res.render('watchlist', {check: true, username: session.username, email: session.email})
})

router.post("/addtolist", appendToList);

//     // query to find user having a specific email
//     const query = "select * from user where email=?"

//   res.redirect("/user/list");
// });

router.get("/list/:listName", async (req, res) => {
  let listName = req.params.listName;
  listName.replace("%20", " ");

  const list = await getMyListByName(listName);
  console.log(list)
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: list,
    heading: "CREATED BY "+session.username,
    time: "Created On "+list.createdAt.slice(0,15),
    isTrending: false,
    listHeading: list.listName
  });
});

router.get("/watchedfilms", (req, res) => {
  res.render("watched_films", {
    check: true,
    username: session.username,
    email: session.email,
  });
});

router.get("/list", async (req, res) => {
  const lists = await getMyLists();
  console.log(lists);
  res.render("user_list", {
    check: true,
    username: session.username,
    email: session.email,
    lists: lists,
    errorCreation: "",
  });
});

router.post("/list/delete/:listName", async (req, res) => {
  let listName = req.params.listName;
  listName.replace("%20", " ");
  await deleteList(listName);

  res.redirect("/user/list");
});

router.post("/list", createList);

router.post("/logout", logout);

module.exports = router;
