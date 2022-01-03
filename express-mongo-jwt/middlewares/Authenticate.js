const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const allowedPaths = ['/api/auth/login', '/api/auth/register']
  if (allowedPaths.includes(req.path)) {
    return next()
  }
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}