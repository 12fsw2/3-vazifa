const { Schema, model } = require("mongoose")

const Book = new Schema({
    title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [2, "Title must be at least 2 characters"]
  },
    pages: {
    type: Number,
    required: true,
    min: [1, "A book must have at least 1 page"]
  },
   publishedYear: {
    type: Number,
    required: true,
    min: [1800, "Year must be after 1800"]
  },
    publishedHome: {
      type: String,
      required: true  
    },
    description: {
      type: String,
      required: true  
    },
    genre: {
      type: String,
      required: true  
    },
    author: {
    type: Schema.Types.ObjectId,
    ref: "author",
    required: true
   },
    imageUrl: {
      type: String,
      required: true  
    }
}, {
    versionKey: false,
    timestamps: true
})

const BookSchema = model("book", Book)
module.exports = BookSchema