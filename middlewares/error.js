module.exports = (err, req, res, next) => {
  console.log("Server error: ", err)
    res.status(500).send("Something went wrong!");
  }