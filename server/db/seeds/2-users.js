/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').insert([
    {
      auth0Id: 'seed-skipper-01',
      name: 'Nathan Outteridge',
      role: 'Skipper / Helm',
      profile_photo: '/images/another.jpeg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-helm-02',
      name: 'Peter Burling',
      role: 'Helmsman',
      profile_photo: '/images/iin.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-trimmer-03',
      name: 'Blair Tuke',
      role: 'Wing Trimmer',
      profile_photo: '/images/seed.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-cyclor-04',
      name: 'Andy Maloney',
      role: 'Cyclor',
      profile_photo: '/images/ql.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-cyclor-05',
      name: 'Josh Junior',
      role: 'Cyclor',
      profile_photo: '/images/rbo.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-engineer-06',
      name: 'Tom Morris',
      role: 'Performance Engineer',
      profile_photo: '/images/ton.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-analyst-07',
      name: 'Sarah McKenzie',
      role: 'Data Analyst',
      profile_photo: '/images/wom2.jpg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-coach-08',
      name: 'Ray Davies',
      role: 'Tactical Coach',
      profile_photo: '/images/ray.jpeg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-shore-09',
      name: 'Mike Sanderson',
      role: 'Shore Team Lead',
      profile_photo: '/images/wiin.jpeg',
      is_seed_user: true,
    },
    {
      auth0Id: 'seed-comms-10',
      name: 'Ella Thompson',
      role: 'Broadcast / Comms',
      profile_photo: '/images/wom.jpeg',
      is_seed_user: true,
    },
  ])
}
