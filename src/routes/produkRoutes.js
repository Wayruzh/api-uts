const router = require('express').Router();
const ctrl = require('../controllers/produkController');
const parseId = require('../middlewares/parseId');
const { validateProduk, validateProdukPatch } = require('../middlewares/validateProduk');

router.get('/', ctrl.getAll);
router.get('/:id', parseId, ctrl.getById);
router.post('/', validateProduk, ctrl.create);
router.put('/:id', parseId, validateProduk, ctrl.replace);
router.patch('/:id', parseId, validateProdukPatch, ctrl.update);
router.patch('/:id/restore', parseId, ctrl.restore);
router.delete('/:id', parseId, ctrl.remove);

module.exports = router;