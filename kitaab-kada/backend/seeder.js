const Book = require("./models/bookModel");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URI, {}).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

connectDatabase();

let bookTitle = [
  "Lady in the town",
  "Happiness is Purity",
  "Life and Death",
  "Kingdom of Lions",
  "Avatar Ratious",
  "Khani Pakistani",
  "Cricket Zuma",
  "Tropical Identity",
  "Most awaited Fun",
  "Umbrella Come Town",
  "Khani Muhabat Ki",
  "Mast Malang",
  "Siyasat Pakistan ki",
  "Political Demise",
  "Geographic Of World",
  "Science Nature",
  "Food Dairies",
  "Health Meter",
  "Tropical Identity",
  "Most awaited Fun",
];

let bookAuthor = [
  "Noaman Saleem",
  "Faisal Anees",
  "hafsa Khalid",
  "Irum Imran",
  "John Ibrahim",
  "bilawal Bajwa",
  "Karim Din",
  "Falcon Anthony",
  "Rommie Sena",
  "Anam Akram",
  "Noor ul Ain",
  "Tommy Hardy",
  "Umer Sukhra",
  "Aleem Dar",
  "Shahid Afridi",
  "Misbah ul Haq",
  "Muhammad Amir",
  "Hina Rabbani",
  "Karim Din",
  "Falcon Anthony",
];

let bookLanguage = [
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
  "urdu",
  "english",
];

let bookCategory = [
  "novel",
  "business",
  "health",
  "all",
  "novel",
  "business",
  "health",
  "all",
  "business",
  "health",
  "novel",
  "business",
  "health",
  "all",
  "novel",
  "business",
  "health",
  "all",
  "business",
  "health",
];

let bookPrice = [
  22, 32, 5, 63, 12, 32, 23, 11, 7, 24, 3, 4, 5, 65, 3, 22, 44, 33, 21, 3, 1,
];
let bookStock = [5, 6, 3, 2, 8, 1, 12, 3, 10, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const createBooks = async () => {
  for (let i = 0; i < 20; i++) {
    try {
      const book = new Book({
        title: bookTitle[i],
        author: bookAuthor[i],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        price: bookPrice[i],
        language: bookLanguage[i],
        category: bookCategory[i],
        stock: bookStock[i],
      });
      await book.save();
      console.log(book);
    } catch (error) {
      console.log("OHNO Error!");
      console.log(error);
    }
  }
};

createBooks();

// const deleteBooks = async () => {
//   await Book.deleteMany();
// };
// deleteBooks();

// app.post("/api/v1/admin/book/new", async (req, res) => {
//   for (let i = 0; i <= 10; i++) {
//     try {
//       const book = await Book.create({
//         title: bookTitle[i],
//         author: bookAuthor[i],
//         description:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//         price: bookPrice[i],
//         language: bookLanguage[i],
//         category: bookCategory[i],
//         stock: bookStock[i],
//       });
//       console.log(book);
//     } catch (error) {
//       console.log("OHNO Error!");
//       console.log(error);
//     }
//   }
// });
// app.listen(8000, () => {
//   console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });
