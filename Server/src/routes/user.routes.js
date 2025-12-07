import express from 'express';
import { getUsers, getUser, update, remove } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validateUpdate } from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', authenticate, requireRole('admin'), getUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, validateUpdate, update);
router.delete('/:id', authenticate, remove);

export default router;
