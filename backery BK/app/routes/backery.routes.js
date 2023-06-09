const { time } = require("console");
module.exports = app => {
  const backery = require("../controllers/backery.controller.js");

  const multer = require('multer');

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {        
        cb(null , Date.now()+'_'+file.originalname);
    }
  });
  const upload = multer({ storage: storage }) 

  var router = require("express").Router();
  


  router.post("/addproduct", backery.createPhonenumber);
   router.get("/products", backery.getnumber);

   
  // Create a new backery
  router.post("/addproduct",upload.single('file'), backery.createProduct);

  // Retrieve all backery
  router.get("/products", backery.findAllProducts);

  // Retrieve all published backery
  router.get("/published", backery.findAllPublished);

  // Retrieve a single backery with id
  router.get("/:id", backery.findOne);

  // Update a backery with id
  router.put("/edit", backery.update);

  // Delete a backery with id
  router.delete("/delete1", backery.delete);

  app.use("/api/backery", router);
};
