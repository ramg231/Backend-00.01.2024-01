const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

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
      return res.status(404).json({ message: `User with email:${email} not found` });
    }

    const match = await bcrypt.compare(password, userFound.password);

    if (!match) {
      return res.status(401).json({ message: `Incorrect email or password` });
    }

    const token = jwt.sign(
      {
        id: userFound.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.json({
      user: userFound,
      tokens: {
        accessToken: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const AuthGithub = async (req = request, res = response) => {
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
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

    const { data: userData } = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (userData) {
      const existUserGithub = await UserModel.findOne({
        where: {
          githubId: userData.id,
        },
      });

      if (!existUserGithub) {
        
      }

    
      const token = jwt.sign(
        {
          id: existUserGithub.id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" }
      );

      res.cookie('token', token);
      res.redirect(`http://localhost:4002/`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, AuthGithub, CallBackGithub };