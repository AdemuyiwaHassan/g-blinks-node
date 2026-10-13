const fs = require("fs");

// reading file
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/postData.json`, "utf-8"),
);

const getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: posts,
    message: "successful",
  });
};
const createPost = (req, res) => {
  res.status(500).json({ status: "fail", message: "route not yet created" });
};
const getPost = (req, res) => {
  res.status(500).json({ status: "fail", message: "route not yet created" });
};
const updatePost = (req, res) => {
  res.status(500).json({ status: "fail", message: "route not yet created" });
};
const deletePost = (req, res) => {
  res.status(500).json({ status: "fail", message: "route not yet created" });
};

module.exports = { getAllPosts, createPost, getPost, updatePost, deletePost };
