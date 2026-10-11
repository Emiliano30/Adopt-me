import { Router } from "express";
import mockController from '../controllers/mock.controller.js'

const router = Router();

router.get('/mockingpets', mockController.getPetsMock);
router.get('/mockingusers', mockController.getUsersMocks);
router.post('/generateData', mockController.createData)

export default router;