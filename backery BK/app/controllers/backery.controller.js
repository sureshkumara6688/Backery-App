var fs = require('fs');
var path = require('path');
const db = require("../models");
const Food = db.Foods;
const Number = db.Phones;
exports.createPhonenumber = (req, res) => {
  if (!req.body.phonenumber) {
    res.send({ message: "Content can not be empty!" });
    return;
  }
  const phones = new Number({
     
    phonenumber: req.body.phonenumber,
    password:886622
  });
  phones
    .save(phones)
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while creating the backery."
      });
    });
}
exports.getnumber = (req, res) => {
  // const password = req.body.password;
  // console.log(password)
  Number.find({ })
    .then(data => {
      console.log(data)
      const category = data.filter((item, index) => {
             item.phonenumber =item.password;
         return item;
      })
      res.status(200).send(category)
     
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lynas."
      });
    });
  
}

exports.createProduct = (req, res) => {
  if (!req.body.FoodName) {
    res.send({ message: "Content can not be empty!" });
    return;
  }
  
  const food = new Food({
    FoodName: req.body.FoodName,
    Price: req.body.Price,
    Quntity: req.body.Quntity,
    DescriPtion: req.body.DescriPtion,
    phonenumber: req.body.phonenumber,
    foodimage: req.file.filename
  });
  food
    .save(food)
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while creating the backery."
      });
    });
}

exports.findAllProducts = (req, res) => {
  const FoodName = req.query.FoodName;
  var condition = FoodName ? { FoodName: { $regex: new RegExp(FoodName), $options: "i" } } : {};
  Food.find({})
    .then(data => {     
      const newData = data.map((item,index)=>{
        item.foodimage = `http://localhost:9090/images/${item.foodimage}`
        return item;
      })
      res.status(200).send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving productname."
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const edit = req.body._id;
  Food.findByIdAndUpdate(edit, req.body, { useFindAndModify: false })
    .then(data1 => {
      if (!data1) {
        res.status(404).send({
          message: `Cannot update backery with id=${id}. Maybe backery was not found!`
        });
      } else res.send({ message: "backery was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating backery with id=" + id
      });
    });
};

// Find a single backery with an id
exports.findOne = (req, res) => {
  const id = req.body.id;
  Food.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found backery with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving backery with id=" + id });
    });
};

// // Update a backery by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   console.log(req.body,req)
//   const id = req.body.id;
//   Food.findByIdAndUpdate(id, req, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update backery with id=${id}. Maybe backery was not found!`
//         });
//       } else res.send({ message: "backery was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating backery with id=" + id
//       });
//     });
// };

// Delete a backery with the specified id in the request
exports.delete = (req, res) => {
  const delete1 = req.body.delete1;
  Food.findByIdAndRemove(delete1, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete backery with id=${id}. Maybe backery was not found!`
        });
      } else {
        res.send({
          message: "product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete backery with delete=" + id
      });
    });
};

// Delete all backerys from the database.
exports.deleteAll = (req, res) => {
  Food.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} backerys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all backerys."
      });
    });
};

// Find all published backerys
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving backerys."
      });
    });
};
