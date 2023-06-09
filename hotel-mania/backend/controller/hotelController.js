const Joi = require("joi");
const fs = require("fs");
const Hotel = require("../models/Hotel");

const hotelController = {
  // **********************************************
  // create hostel
  // **********************************************

  async create(req, res, next) {
    // console.log(req.body);

    // 1. validate req body
    // 2. handle photo storage, naming
    // 3. add to db
    // 4. return response.

    // client side -> base64 encoded string -> decode -> store -> save photo's path in db

    const createHotelSchema = Joi.object({
      name: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      location: Joi.string().required(),
      province: Joi.string().required(),
      country: Joi.string().required(),
      description: Joi.string().required(),
      totalRooms: Joi.string().required(),
      photo: Joi.string().required(),
    });

    const { error } = createHotelSchema.validate(req.body);

    if (error) {
      console.log(`Validation error`);
      return next(error);
    }

    const {
      name,
      city,
      address,
      location,
      province,
      country,
      description,
      totalRooms,
      photo,
    } = req.body;

    // read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // allot a random name
    // const imagePath = `${Date.now()}-${author}.png`;
    const imagePath = `${Date.now()}-${name}.png`;

    // // save to cloudinary
    // let response;

    try {
      // response = await cloudinary.uploader.upload(photo);
      const pathReturned = fs.writeFileSync(
        `storage/images/hotel/${imagePath}`,
        buffer
      );
      console.log(`pathReturned`);
      console.log(`${pathReturned}`);
    } catch (error) {
      return next(error);
    }

    // // save hotel in db
    // let newHotel;
    // try {
    //   newHotel = new Hotel({
    //     name,
    //     city,
    //     address,
    //     location,
    //     province,
    //     country,
    //     description,
    //     totalRooms,
    //     photoPath: `storage/${imagePath}`,
    //   });

    //   await newHotel.save();
    // } catch (error) {
    //   return next(error);
    // }

    // // const blogDto = new BlogDTO(newBlog);

    // // return res.status(201).json({ blog: blogDto });
    // //
    // console.log(photoPath);
    //
    res.json({ msg: "New Hotel created" });
  },

  // **********************************************
  // get all
  // **********************************************

  async getAll(req, res, next) {
    res.send(`All Hostels read from DB!`);
  },

  // **********************************************
  // get by Id
  // **********************************************

  async getById(req, res, next) {
    res.send(`Specific Hostel read from DB!`);
  },

  // **********************************************
  // update hostel
  // **********************************************

  async update(req, res, next) {
    res.send(`updated hostel in DB!`);
  },

  // **********************************************
  // delete hostel
  // **********************************************

  async delete(req, res, next) {
    res.send(`deleted hostel in DB!!`);
  },
}; // hostelController

module.exports = hotelController;
