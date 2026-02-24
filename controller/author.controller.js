const AuthorSchema = require("../schema/author.schema");

// Barcha authorlarni olish
const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  try {
    const {searchingValue} = req.query
    const result = await AuthorSchema.find({
      fullName: {$regex: searchingValue, $options: "i"},
  
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Yagona authorni olish
const getOneAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedAuthor = await AuthorSchema.findById(id);
    if (!foundedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(foundedAuthor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Author qo‘shish
const addAuthor = async (req, res) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl } = req.body;

    const newAuthor = await AuthorSchema.create({
      fullName,
      birthDate,
      deathDate,
      bio,
      work,
      period,
      imageUrl
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Authorni yangilash
const updateAuthor = async (req, res) => {
  try {
    const { fullName, birthDate, deathDate, bio, work, period, imageUrl } = req.body;
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);
    if (!foundedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    const updatedAuthor = await AuthorSchema.findByIdAndUpdate(
      id,
      { fullName, birthDate, deathDate, bio, work, period, imageUrl },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Authorni o‘chirish
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedAuthor = await AuthorSchema.findById(id);
    if (!foundedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    await AuthorSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted author" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
};