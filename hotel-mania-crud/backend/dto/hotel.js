class HotelDTO {
  constructor(hotel) {
    this._id = hotel._id;
    this.author = hotel.author;
    this.name = hotel.name;
    this.description = hotel.description;
    this.photo = hotel.photoPath;
  }
}

module.exports = HotelDTO;
