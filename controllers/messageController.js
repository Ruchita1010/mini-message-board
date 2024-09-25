import { body, validationResult } from 'express-validator';
import { addNewMessage, retrieveAllMessages } from '../db/queries.js';

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await retrieveAllMessages();
    res.render('index', {
      title: 'Mini Message Board',
      link: { href: '/new', text: 'message' },
      messages,
    });
  } catch (err) {
    next(err);
  }
};

export const getMessageForm = (req, res) => {
  res.render('messageForm', {
    title: 'Message Form',
    link: { href: '/', text: 'home' },
    errors: {},
    formData: req.body,
  });
};

const validateUser = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Message must be between 2 to 500 characters'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 to 30 characters')
    .matches(/^[\w.]+$/)
    .withMessage('Username can only contain letters, numbers, _ or .'),
];

export const createNewMessage = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req).mapped();
      if (JSON.stringify(errors) !== '{}') {
        res.status(400).render('messageForm', {
          title: 'Message Form',
          link: { href: '/', text: 'home' },
          errors: errors,
          formData: req.body,
        });
        return;
      }
      await addNewMessage(req.body);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];
