import express from 'express';

import * as clientController from '../conrollers/clientController.js'

const router = express.Router();

router.get('/clients', clientController.getAllClientsController);
router.post('/clients', clientController.createClientController);
router.put('/clients/:id', clientController.updateClientController);
router.delete('/clients/:id', clientController.deleteClientController);
router.get('/clients/search', clientController.searchClientsController); 


export default router;