const router = require('express').Router();
const upload = require('../config/multer');
const storeController = require('../controller/store-controller');

router.post('', upload.single('logo'), storeController.createStore);

module.exports = router;