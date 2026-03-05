/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('chat').insert([
    {
      message: 'True wind 19 knots, oscillating 5 degrees right.',
      auth0Id: 'seed-analyst-07',
    },
    {
      message: 'Foil cant stable at 118 degrees, boat speed above target.',
      auth0Id: 'seed-engineer-06',
    },
    {
      message: 'Ride height steady at 1.4 metres.',
      auth0Id: 'seed-helm-02',
    },
    {
      message: 'Right shift building — recommend committing this tack.',
      auth0Id: 'seed-coach-08',
    },
    {
      message: 'Copy that, tacking in three… two… one.',
      auth0Id: 'seed-skipper-01',
    },
    {
      message: 'Hydraulic pressure holding, no drop through manoeuvre.',
      auth0Id: 'seed-cyclor-04',
    },
  ])
}
