/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('historical_data', (table) => {
    table.increments('id').primary()
    table.string('sensor_id')
    table.timestamp('time_stamp').defaultTo(knex.fn.now())
    table.float('speed')
    table.float('temperature')
    table.float('battery')
    table.float('altitude')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('historical_data')
}
