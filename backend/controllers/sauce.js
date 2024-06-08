const Sauce = require("../models/sauce");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + "://" + req.get("host");
  const sauce = new Sauce({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.sauce.heat,
    };
  } else {
    sauce = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.getAllStuff = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likesHandler = (req, res, next) => {
  const react = req.body.like;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  Sauce.findOne({
    _id: req.params.id,
  }).then((sauce) => {
    let usersDisliked = sauce.usersDisliked;
    switch (react) {
      case 1:
        sauce.likes++;
        sauce.usersLiked.push(userId);
        break;
      case -1:
        sauce.dislikes++;
        usersDisliked.push(userId);
        break;
      case 0:
        if (sauce.usersLiked.includes(userId)) {
          sauce.usersLiked = sauce.usersLiked.filter((element) => element != userId);
          console.log(sauce.usersLiked);
          sauce.likes--;
        } else if (sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked = sauce.usersDisliked.filter((element) => element != userId);
          sauce.dislikes--;
        }
        break;
      default:
        res.status(400).json({
          error: "error invalid like parameter. Like must be 1, -1 or 0",
        });
    }
    console.log(sauce);
    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => {
        res.status(201).json({
          message: "like updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};
