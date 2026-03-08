/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('telemetry').del()
  await knex('users').del()
  await knex('chat').del()
}
