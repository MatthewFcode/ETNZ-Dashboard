/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0Id').notNullable()
    table.string('name')
    table.string('role')
    table.string('profile_photo')
    table.timestamp('activity_status').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.dropTable('users')
}
