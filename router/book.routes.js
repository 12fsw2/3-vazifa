const { Router } = require("express");
const {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook
} = require("../controller/book.controller");

const bookRouter = Router();

// Barcha kitoblarni olish
bookRouter.get("/", getAllBooks);

// Yagona kitobni olish
bookRouter.get("/:id", getOneBook);

// Yangi kitob qo'shish
bookRouter.post("/", addBook);

// Kitobni yangilash
bookRouter.put("/:id", updateBook);

// Kitobni o'chirish
bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;