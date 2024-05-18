const { request, response } = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const UserModel = require("../modules/users/user.entity");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const userFound = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!userFound) {
      return res.json({ message: `User with email:${email} not found` });
    }
    const { dataValues: dataUser } = userFound;
    const match = await bcrypt.compare(password, dataUser.password);

    if (!match) {
      return res.json({ message: `Password or email incorrect` });
    }

    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.json({
      user: dataUser,
      tokens: {
        accessToken: token,
      },
    });
  } catch (err) {
    res.json({ err });
  }
};

const AuthGithub = async (req = request, res = response) => {
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  } catch (err) {}
};

const CallBackGithub = async (req = request, res = response) => {
  try {
    const { code } = req.query;
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET_TOKEN,
      code,
    };
    const options = { headers: { accept: "application/json" } };

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body,
      options
    );

    const { data: dataUser } = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    console.log(dataUser);
    if (dataUser) {
      const existUserGithub = await UserModel.findOne({
        where: {
          githubId: dataUser.id,
        },
      });

      //si no existe, crear
      //si existe devovler una cookie  jwt

      // res.cookie('token',)
    }

    if (data) {
      res.redirect(`http://localhost:4002/`);
    }
  } catch (err) {}
};

module.exports = { login, AuthGithub, CallBackGithub };
