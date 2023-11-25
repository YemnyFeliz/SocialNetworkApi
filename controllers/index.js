const router = require('express').Router();
const apiRoutes = require('./api'); //Import routes from api folder

router.use('/api', apiRoutes);



module.exports = router;