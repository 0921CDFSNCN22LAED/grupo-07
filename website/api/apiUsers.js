const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator"); //trae los datos guardados en "validator"

//enviamos de client: Cant Clientes, city_Id, role
//enviamos de profesional:  cant, emergency, price,

const apiUsers = {
  //listado clientes
  clientList: async function (req, res) {
    const cliente = await db.Client.findAll({
      include: [{ association: "cities" }],
    });
    //cliente.reduce(function () {});

    // roles = cliente.map(function (cliente) {
    //   return cliente.role;
    // });

    totalProfessionals = cliente.filter(function (prof) {
      return prof.role == "Professional";
    });

    totalClients = cliente.filter(function (cliente) {
      return cliente.role == "Client";
    });

    totalAdmins = cliente.filter(function (admin) {
      return admin.role == "Admin";
    });

    const professions = await db.Profession.findAll();

    const uniqProfessions = professions.filter(function (valor) {
      return valor.profession;
    });

    const professionsName = professions.map(function (x) {
      return x.profession;
    });

    const totalPerProf = [];
    for (let i = 1; i <= uniqProfessions.length; i++) {
      totalPerProf.push(
        await db.professionals_profession.count({
          where: {
            profession_id: {
              [Op.like]: i,
            },
          },
        })
      );
      await db.Profession.findByPk(i);
    }

    //   cantidad = await db.Client.count()

    //   cantidad = await db.Role.findAll({
    //       atributes: ["name"],
    //       group: []
    //   })

    //FALTA filtrar cant por rol

    return res.status(200).json({
      //data: clients,
      totalUsers: cliente.length,
      //profperzone:,
      //totalAdmin:
      totalProfessionals: totalProfessionals.length,
      totalClients: totalClients.length,
      totalAdmins: totalAdmins.length,
      professions: professions,
      totalProfessions: uniqProfessions.length,
      totalPerProf: totalPerProf,
    });
  },
  //listado profesionales

  //listado profesiones (analizar si hacer en otra api)
};

module.exports = apiUsers;
