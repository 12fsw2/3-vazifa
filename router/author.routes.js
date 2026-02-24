const { Router } = require("express");
const {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
} = require("../controller/author.controller");

const authorRouter = Router();

authorRouter.get("/search", search);

// Barcha authorlarni olish
authorRouter.get("/get_all_authors", getAllAuthors);

// Yagona authorni olish
authorRouter.get("/get_one_author/:id", getOneAuthor);


// Yangi author qo'shish
authorRouter.post("/add_author", addAuthor);

// Authorni yangilash
authorRouter.put("/update_author/:id", updateAuthor);

// Authorni o'chirish
authorRouter.delete("/delete_author/:id", deleteAuthor);

module.exports = authorRouter;