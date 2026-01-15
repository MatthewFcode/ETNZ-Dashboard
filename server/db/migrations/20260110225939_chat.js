/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('chat', (table) => {
    table.increments('id').primary()
    table.string('message')
    table.timestamp('time_sent').defaultTo(knex.fn.now())
    table.string('auth0Id').references('users.auth0Id').onDelete('CASCADE') // references the users table .where() for where it is the same and gather user info for each message
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.dropTable('chat')
}
