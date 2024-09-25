import { pool } from './pool.js';

export const retrieveAllMessages = async () => {
  const { rows } = await pool.query(
    'SELECT username, message, created_on FROM users ORDER BY created_on DESC;'
  );
  return rows;
};

export const addNewMessage = async ({ username, message }) => {
  await pool.query('INSERT INTO users (username, message) VALUES ($1, $2);', [
    username,
    message,
  ]);
};
