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
    messages: messages,
  });
};

export const getMessageForm = (req, res) => {
  res.render('messageForm', {
    title: 'Message Form',
    link: { href: '/', text: 'home' },
  });
};

export const createNewMessage = (req, res) => {
  const { message, username } = req.body;
  messages.push({
    message,
    username,
    created_on: new Date().toLocaleDateString(),
  });
  res.redirect('/');
};
