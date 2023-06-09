
const { type } = require("os");
const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      FoodName: {
      type: String,
      required: true
    },
    Price: {
      type: Number,
      required: true
    },
    Quntity: {
      type: Number,
      required: false
    },
    DescriPtion: {
      type: String,
      required: false
    },
   
    foodimage:{
      type: String,
      required: true
    }
    
  });
  const Foodslist = mongoose.model("Foods", schema);
  return Foodslist;
};
