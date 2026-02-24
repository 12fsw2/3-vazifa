const { Router } = require("express");
const {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
} = require("../controller/author.controller");

const authorRouter = Router();

// Barcha authorlarni olish
authorRouter.get("/", getAllAuthors);

// Yagona authorni olish
authorRouter.get("/:id", getOneAuthor);

// Yangi author qo'shish
authorRouter.post("/", addAuthor);

// Authorni yangilash
authorRouter.put("/:id", updateAuthor);

// Authorni o'chirish
authorRouter.delete("/:id", deleteAuthor);

module.exports = authorRouter;