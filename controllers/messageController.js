import { body, validationResult } from 'express-validator';

// to be replaced by a DB
const messages = [
  {
    message: 'Hi there!',
    username: 'Amando',
    created_on: new Date().toLocaleDateString(),
  },
  {
    message: 'Hello World!',
    username: 'Charles',
    created_on: new Date().toLocaleDateString(),
  },
];

export const getAllMessages = (req, res) => {
  res.render('index', {
    title: 'Mini Message Board',
    link: { href: '/new', text: 'message' },
    messages,
  });
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
    .withMessage('Message must be between 5 to 500 characters'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 3 to 30 characters')
    .matches(/^[\w.]+$/)
    .withMessage('Username can only contain letters, numbers, _ or .'),
];

export const createNewMessage = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req).mapped();
    if (JSON.stringify(errors) !== '{}') {
      console.log(errors);
      res.status(400).render('messageForm', {
        title: 'Message Form',
        link: { href: '/', text: 'home' },
        errors: errors,
        formData: req.body,
      });
      return;
    }
    const { message, username } = req.body;
    messages.push({
      message,
      username,
      created_on: new Date().toLocaleDateString(),
    });
    res.redirect('/');
  },
];
