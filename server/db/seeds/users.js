/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('users').insert([
    {
      auth0Id: 'auth0|test-user-id',
      name: 'Matthew',
      role: 'Software Engineer',
      activity_status: 'now',
    },
  ])
}
