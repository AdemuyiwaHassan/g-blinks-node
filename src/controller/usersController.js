const fs = require("fs");

/**
 *
 * GET all users
 * @param {*} res
 */
const getAllUsers = (req, res) => {
  fs.readFile(`${__dirname}/../../data/users.json`, "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ status: "failed", message: "Error reading users data" });
      return;
    }

    const users = JSON.parse(data);
    res.status(200).json({ status: "success", data: users });
  });
};

/**
 * Get users by ID
 */

const getUserById = (req, res) => {
  const userId = req.params.id;
  fs.readFile(`${__dirname}/../../data/users.json`, "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ status: "failed", message: "Error reading users data" });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.status(404).json({ status: "failed", message: "User not found" });
      return;
    }

    res.status(200).json({ status: "success", data: user });
  });
};

/**
 * Create a new user
 */

const createUser = (req, res) => {
  let user = req.body;
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ status: "failed", message: "Error reading users data" });
      return;
    }

    const users = JSON.parse(data);
    users.push(user);

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: "failed", message: "Error writing users data" });
        return;
      }
      res.status(201).json({ status: "success", data: user });
    });
  });
};

/**
 * Patch user by ID
 * @param {*} req
 * @param {*} res
 */
const updateUser = (req, res) => {
  res.status(500).json({ status: "failed", message: "Route not yet created" });
};

/**
 * Delete User by ID
 * @param {*} req
 * @param {*} res
 */

const deleteUser = (req, res) => {
  res.status(500).json({ status: "failed", message: "Route not yet created" });
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
