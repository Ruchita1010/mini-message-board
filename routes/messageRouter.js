import { Router } from 'express';
import {
  getAllMessages,
  getMessageForm,
  createNewMessage,
} from '../controllers/messageController.js';

const messageRouter = Router();

messageRouter.get('/', getAllMessages);
messageRouter.get('/new', getMessageForm);
messageRouter.post('/new', createNewMessage);

export default messageRouter;
