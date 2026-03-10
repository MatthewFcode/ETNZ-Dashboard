import knex from 'knex';
import config from './server/db/knexfile.js';

const db = knex(config.development);

async function checkNow() {
  const now = await db.fn.now();
  console.log('knex.fn.now():', now);
  
  // Create a temporary table to see what actually gets stored
  await db.schema.createTable('test_now', (table) => {
    table.timestamp('ts').defaultTo(db.fn.now());
  });
  
  await db('test_now').insert({});
  const result = await db('test_now').select().first();
  console.log('Stored value:', result.ts);
  
  await db.schema.dropTable('test_now');
  await db.destroy();
}

checkNow().catch(console.error);
