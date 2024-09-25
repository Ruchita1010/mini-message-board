import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

const { Pool } = pg;
export const pool = new Pool({
  connectionString: process.env.DB_URL,
});
