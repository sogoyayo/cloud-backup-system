import { Pool } from 'pg';


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cloud-backup-db',
  password: 'fullstack_93',
  port: 5432,
});