const express = require("express");
const dbConnect = require("./database/index");
const Hotel = require("./models/Hotel");

const PORT = 8000;

const app = express();

const addHotels = async () => {
  try {
    //Connection the MongoDB
    await dbConnect();
    for (let i = 0; i < 50; i++) {
      console.log(`In for Loop i = ${i}`);
      let data = new Hotel({
        name: "Dummy Hotel Name",
        city: "Lahore",
        address: "Allama Iqbal Town",
        location: "Moon Market",
        province: "Punjab",
        country: "Pakistan",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        totalRooms: 40,
        photoPath: `storage/images/hotel/1686466071814-6481a4f11e9b345b432f5d9a.png`,
        author: "6481a4f11e9b345b432f5d9a",
      });
      await data.save();
      console.log(`Added Successfully`);
    }
  } catch (error) {
    console.log(`OH NO ERROR`);
    console.log(error);
  }
};

addHotels();

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
