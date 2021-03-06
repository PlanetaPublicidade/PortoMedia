const currentEmailModel = require('../models/current_email.model');
const CurrentEmail = currentEmailModel.CurrentEmail;

const outdoorModel = require('../models/outdoor.model');
const Outdoor = outdoorModel.Outdoor;

const requestModel = require('../models/request.model');
const Request = requestModel.Request;

/**
 *! Available & Visible  
 *? 1 - True
 *? 0 - False
 */

exports.ChangeCurrentEmail = (req, res) => {
    CurrentEmail.update({
        email: req.body.email
    }, {
        where: {
            id: 1
        }
    }).then((result) => {
        res.status(200).json({
            message: "Email mudado para: " + req.body.email
        });
    }).catch((error) => {
        res.status(400).send(error);
    });
};

exports.getCurrentEmail = (req, res) => {
    CurrentEmail.findOne({
        where: {
            id: 1
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
};

exports.createCurrentEmail = (req, res) => {
    CurrentEmail.create({
        email: req.body.email
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(200).send(error);
    })
}

exports.getOutdoors = (req, res) => {
    Outdoor.findAll().then((result) => {
        res.status(200).json(result);
    }).catch((errors) => {
        res.status(400).send(errors);
    })
};

exports.changeOutdoorVisibility = (req, res) => {
    Outdoor.update({
        visible: parseInt(req.body.visible)
    }, {
        where: {
            id: req.params.outdoorId
        }
    }).then((result) => {
        res.status(200).json({
            message: "Outdoor atualizado com sucesso!"
        });
    }).catch((error) => {
        res.status(400).send(error);
    });
};

exports.AddAcceptedRequest = (req, res) => {
    Request.create({
        company: req.body.company,
        userEmail: req.body.userEmail,
        outdoorNumber: req.body.outdoorNumber,
        monthly_price: req.body.monthly_price,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        status: "Aceite"
    }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    })
};

exports.getAllRequest = (req, res) => {
    Request.findAll().then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    })
};

exports.changeRentStatus = (req, res) => {
    Request.update({
        status: req.body.status
    },{
        where: {
            id: req.params.requestId
        }
    }).then((result) => {
        res.status(200).json({
            message: "Estado do aluguer atualizado!"
        })
    }).catch((error) => {
        res.status(400).send(error);
    });
};