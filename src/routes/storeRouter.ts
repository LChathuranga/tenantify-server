import { Router } from "express";
import jwtValidator from "../middleware/jwtValidator";
import { requireAuth, requireRole } from "../middleware/auth";
import { createStore, deleteStore, getAllStores, getStoreByAdmin, getStoreById, moderateStore, updateStore } from "../controllers/storeController";

const router = Router()

router.post('/', jwtValidator, requireAuth, requireRole('ADMIN'), createStore);
router.get('/:id', jwtValidator, requireAuth, requireRole('ADMIN'), getStoreById);
router.get('/', jwtValidator, requireAuth, requireRole('ADMIN'), getAllStores);
router.get('/admin', jwtValidator, requireAuth, requireRole('ADMIN'), getStoreByAdmin);
router.put('/:id', jwtValidator, requireAuth, requireRole('ADMIN'), updateStore);
router.delete('/:id', jwtValidator, requireAuth, requireRole('ADMIN'), deleteStore);
router.put('/:id/moderate', jwtValidator, requireAuth, requireRole('SUPERADMIN'), moderateStore);

export default router