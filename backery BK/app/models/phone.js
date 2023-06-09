
const { type } = require("os");
const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
   
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
  
  });
  const newnumbwe = mongoose.model("Phone", schema);
  return newnumbwe;
};
