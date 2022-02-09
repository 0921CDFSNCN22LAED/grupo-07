const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");

/*
  FALTA REVISAR EL UPDATE DE IMAGENES CON MULTER
  CIUDAD DEL CLIENTDETAIL! SOLO TRAE ID DE ZONA NO EL NOMBRE
*/

const clientDbController = {
  //form de creacion cliente (GET)
  registerClient: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    res.render("users/registerClients", {
      userClient: userClient,
      userProf: userProf,
    });
  },

  createClient: function (req, res) {
    //Boton del form de creacion cliente (POST)
    req.session.dniFound = req.body.dni;

    db.Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      dni: req.body.dni,
      mobile: req.body.mobile,
      avatar: req.file.filename,
      password: bcrypt.hashSync(req.body.password, 10),
      city_Id: req.body.city_Id, //viene num por form (futuro, API)
      role: req.body.role,
    });

    if (req.body.role == "Client") {
      console.log("dentro del if para client");
      res.redirect("/login");
    } else if (req.body.role == "Professional") {
      console.log("dentro del if para prof");
      res.redirect("/rubros/registerProf");
    }
  },

  //muestra el id en lugar de la ciudad
  clientDetail: (req, res) => {
    //por (GET)
    db.Client.findOne(
      // {
      //   include: [{ association: "cities" }],
      // },
      {
        where: {
          dni: req.params.dni,
        },
      }
    ).then(function (result) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      let clientFound = result;
      //console.log("Dentro del result viene " + clientFound.email);

      res.render("users/clientDetail", {
        userClient: userClient,
        userProf: userProf,
        clientFound: clientFound,
      }); //render usa ruta en carpeta (users)
    });
  },

  // la vista de edit no trae el value de ciudad

  editClient: (req, res) => {
    // por (GET)
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    console.log("Dentro req.params.dni " + req.params.dni);

    db.Client.findOne(
      // {
      //   include: [{ association: "cities" }],
      // },
      {
        where: {
          dni: req.params.dni,
        },
      }
    ).then(function (result) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      let clientFound = result;

      res.render("users/editClient", {
        userClient: userClient,
        userProf: userProf,
        clientFound: clientFound,
      }); //carpeta professionals
    });
  },

  //Actualizar para usar la DB
  //por (PUT)
  updateClient: (req, res) => {
    

    db.Client.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        city_Id: req.body.city_Id, //viene num por form (futuro, API)
        address: req.body.address,
        mobile: req.body.mobile,
        avatar: req.file.filename,
      },
      {
        where: { dni: req.session.clientFound.dni },
      }
    );

    res.redirect("/");
  },

  delete: async (req, res) => {
    
    await db.Client.destroy({
      where:{
        dni: req.params.dni,
      },
    });
    //delete property 'clientFound' of session instead of completely destroying session
    req.session.destroy();
    
    res.redirect('/');
  }
};

module.exports = clientDbController;