const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
  try {
    const books = await BookSchema.find().populate("author", "fullName birthDate period");
    res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedBook = await BookSchema.findById(id).populate("author", "fullName birthDate period");
    if (!foundedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(foundedBook);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Kitob qo‘shish
const addBook = async (req, res) => {
  try {
    const { title, pages, publishedYear, publishedHome, description, genre, imageUrl, author } = req.body;

    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }

    const newBook = await BookSchema.create({
      title,
      pages,
      publishedYear,
      publishedHome,
      description,
      genre,
      imageUrl,
      author
    });

    res.status(201).json(newBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Kitobni yangilash
const updateBook = async (req, res) => {
  try {
    const { title, pages, publishedYear, publishedHome, description, genre, imageUrl, author } = req.body;
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);
    if (!foundedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await BookSchema.findByIdAndUpdate(
      id,
      { title, pages, publishedYear, publishedHome, description, genre, imageUrl, author },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


const search = async (req, res) => {
  try {
    const { searchingValue } = req.query;

    const result = await BookSchema.find({
      title: { $regex: searchingValue, $options: "i" },
    }).populate("author");

    res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Kitobni o‘chirish
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedBook = await BookSchema.findById(id);
    if (!foundedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    await BookSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted book" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  search
};