const express = require('express');
const router = express.Router();
const franchiseAccountController = require('../controllers/franchiseAccount.controller');
const auth = require('../middleware/auth.middleware');

// All routes are protected and for admins only
router.use(auth);

router.post('/', franchiseAccountController.createAccount);
router.get('/', franchiseAccountController.getAccounts);
router.put('/:id', franchiseAccountController.updateAccount);
router.delete('/:id', franchiseAccountController.deleteAccount);

module.exports = router;
