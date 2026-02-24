const { Router } = require("express");
const {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  search
} = require("../controller/book.controller");

const bookRouter = Router();

// Barcha kitoblarni olish
bookRouter.get("/get_all_books", getAllBooks);

bookRouter.get("/search", search);

// Yagona kitobni olish
bookRouter.get("/get_one_book/:id", getOneBook);

// Yangi kitob qo'shish
bookRouter.post("/add_book", addBook);

// Kitobni yangilash
bookRouter.put("/update_book/:id", updateBook);

// Kitobni o'chirish
bookRouter.delete("/delete_book/:id", deleteBook);

module.exports = bookRouter;