const hostelController = {
  // **********************************************
  // create hostel
  // **********************************************

  async create(req, res, next) {
    res.send(`New hostel created!`);
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
    res.send(`deleted hostel in DB!`);
  },
}; // hostelController

module.exports = hostelController;
