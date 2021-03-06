const userModel = require('../models/user.model');
const User = userModel.User;

const requestModel = require('../models/request.model');
const Request = requestModel.Request;

const userRequestModel = require('../models/user_request.model');
const UserRequest = userRequestModel.User_Request;

const outdoorModel = require('../models/outdoor.model');
const Outdoor = outdoorModel.Outdoor;

const favoritesModel = require('../models/favorites.model');
const Favorite = favoritesModel.Favorite;

exports.editProfile = (req, res) => {
    User.update({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        company: req.body.company
    }, {
        where: {
            id: req.loggedUserId
        }
    }).then((result) => {
        res.status(200).json({
            message: "Dados atualizados!"
        });
    }).catch((error) => {
        res.status(400).send(error)
    });
};

exports.getLoggedUser = (req, res) => {
    User.findOne({
        where: {
            id: req.loggedUserId
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
};

exports.getUserFavorites = (req, res) => {
    Favorite.findAll({
        where: {
            userId: req.loggedUserId
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
};

exports.getUserRentOutdoors = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.loggedUserId
        }
    });
    Request.findAll({
        where: {
            userEmail: user.email
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    })
};