import express from 'express';
import {addNewShuttle, getShuttles , getShuttle, updateShuttle, deleteShuttle} from '../controllers/shuttleController.js'
import {protect , admin} from '../utils/middleware.js'

const router = express.Router();

router.route('/').post(protect , admin , addNewShuttle).get(getShuttles);
router.put('/:id' , protect , admin , updateShuttle);
router.delete('/:id' , protect , admin , deleteShuttle);
router.route('/:id').get(getShuttle);


export default router