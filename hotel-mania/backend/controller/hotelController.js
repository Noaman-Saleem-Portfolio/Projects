const Joi = require("joi");
const fs = require("fs");
const Hotel = require("../models/Hotel");
const HotelDetailsDTO = require("../dto/hotelDetails");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const hotelController = {
  // **********************************************
  // create hotel
  // **********************************************

  async create(req, res, next) {
    // console.log(req.body);

    // 1. validate req body
    // 2. handle photo storage, naming
    // 3. add to db
    // 4. return response.

    // client side -> base64 encoded string -> decode -> store -> save photo's path in db

    const createHotelSchema = Joi.object({
      author: Joi.string().regex(mongodbIdPattern).required(),
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
      author,
    } = req.body;

    // read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // allot a random name
    const imagePath = `${Date.now()}-${author}.png`;
    // const imagePath = `${Date.now()}-${name}.png`;

    // // save to cloudinary
    // let response;

    try {
      // response = await cloudinary.uploader.upload(photo);
      const pathReturned = fs.writeFileSync(
        `storage/images/hotel/${imagePath}`,
        buffer
      );
      // console.log(`pathReturned`);
      // console.log(`${pathReturned}`);
    } catch (error) {
      return next(error);
    }

    // save hotel in db
    let newHotel;
    try {
      newHotel = new Hotel({
        name,
        city,
        address,
        location,
        province,
        country,
        description,
        totalRooms,
        photoPath: `storage/images/hotel/${imagePath}`,
        author,
      });

      await newHotel.save();
    } catch (error) {
      return next(error);
    }

    // // const blogDto = new BlogDTO(newBlog);

    // // return res.status(201).json({ blog: blogDto });
    // //
    // console.log(photoPath);
    ////
    res.status(201).json({ msg: "New Hotel created", hotel: newHotel });
  },

  // **********************************************
  // get all
  // **********************************************
  //
  async getAll(req, res, next) {
    let query;
    //
    console.log(req.query);

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Finding resource...
    query = Hotel.find(reqQuery);

    // const totalDocuments = await Hotel.find(query).countDocuments();
    const totalDocuments = await Hotel.countDocuments();

    console.log("totalDocuments : ", totalDocuments);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;

    let pages = 1;

    //Avoiding 0/0 in mathematics
    if (totalDocuments !== 0) {
      pages = Math.ceil(totalDocuments / pageSize);
    }

    console.log("Pages : ", pages);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        success: false,
        message: "No page found",
      });
    }

    try {
      const hotels = await query;

      // const blogsDto = [];

      // for (let i = 0; i < blogs.length; i++) {
      //   const dto = new BlogDTO(blogs[i]);
      //   blogsDto.push(dto);
      // }

      return res.status(200).json({ hotels, pages });
    } catch (error) {
      return next(error);
    }
  },

  // **********************************************
  // get by Id
  // **********************************************

  async getById(req, res, next) {
    // validate id
    // response

    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    let hotel;

    const { id } = req.params;

    try {
      hotel = await Hotel.findOne({ _id: id }).populate("author");
    } catch (error) {
      return next(error);
    }

    const hotelDto = new HotelDetailsDTO(hotel);

    res.status(200).json({ hotel: hotelDto });
  },

  // **********************************************
  // update hotel
  // **********************************************

  async update(req, res, next) {
    //validate
    const createHotelSchema = Joi.object({
      author: Joi.string().regex(mongodbIdPattern).required(),
      hotelId: Joi.string().regex(mongodbIdPattern).required(),
      name: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      location: Joi.string().required(),
      province: Joi.string().required(),
      country: Joi.string().required(),
      description: Joi.string().required(),
      totalRooms: Joi.string().required(),
      photo: Joi.string().allow(""),
    });

    // const {
    //   name,
    //   city,
    //   address,
    //   location,
    //   province,
    //   country,
    //   description,
    //   totalRooms,
    // } = req.body;
    const { error } = createHotelSchema.validate(req.body);

    if (error) {
      console.log(`Validation error`);
      return next(error);
    }

    const {
      author,
      hotelId,
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

    // delete previous photo
    // save new photo

    let hotel;

    try {
      hotel = await Hotel.findOne({ _id: hotelId });
    } catch (error) {
      return next(error);
    }

    if (photo) {
      let previousPhoto = hotel.photoPath;
      //
      // console.log(previousPhoto);
      previousPhoto = previousPhoto.split("/").at(-1);
      // //console.log(previousPhoto);

      // delete photo
      fs.unlinkSync(`storage//images/hotel/${previousPhoto}`);

      // read as buffer
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      // allot a random name
      const imagePath = `${Date.now()}-${author}.png`;
      // const imagePath = `${Date.now()}-${name}.png`;

      // // save to cloudinary
      // let response;

      try {
        // response = await cloudinary.uploader.upload(photo);
        const pathReturned = fs.writeFileSync(
          `storage/images/hotel/${imagePath}`,
          buffer
        );
      } catch (error) {
        return next(error);
      }

      await Hotel.updateOne(
        { _id: hotelId },
        {
          name,
          city,
          address,
          location,
          province,
          country,
          description,
          totalRooms,
          photoPath: `storage/images/hotel/${imagePath}`,
        }
      );
    } else {
      await Hotel.updateOne(
        { _id: hotelId },
        {
          name,
          city,
          address,
          location,
          province,
          country,
          description,
          totalRooms,
        }
      );
    }

    // HTTP 204 should imply "resource updated successfully"
    res.status(204).json({ msg: `updated hostel in DB!` });
  },

  // **********************************************
  // delete hostel
  // **********************************************

  async delete(req, res, next) {
    // validate id
    // delete hotel
    // delete comments on this hotel

    const deleteHotelSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteHotelSchema.validate(req.params);

    if (error) {
      console.log(`Validation error`);
      return next(error);
    }

    const { id } = req.params;

    // delete hotel
    // delete comments
    try {
      await Hotel.deleteOne({ _id: id });

      // await Comment.deleteMany({ blog: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ msg: "hotel deleted" });
  },
}; // hostelController

module.exports = hotelController;
