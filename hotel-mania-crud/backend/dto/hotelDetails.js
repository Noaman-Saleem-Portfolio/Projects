class HotelDetailsDTO {
  constructor(hotel) {
    this._id = hotel._id;
    this.address = hotel.address;
    this.city = hotel.city;
    this.country = hotel.country;
    this.createdAt = hotel.createdAt;
    this.description = hotel.description;
    this.location = hotel.location;
    this.name = hotel.name;
    this.photoPath = hotel.photoPath;
    this.province = hotel.province;
    this.totalRooms = hotel.totalRooms;
    this.author = {
      username: hotel.author.username,
      email: hotel.author.email,
      userId: hotel.author._id,
    };
  }
}
//
module.exports = HotelDetailsDTO;
