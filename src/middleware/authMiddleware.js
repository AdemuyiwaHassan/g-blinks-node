const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authentication middleware executed");
  // Add your authentication logic here
  next();
};



module.exports = { auth };
