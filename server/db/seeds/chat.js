/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // 1. Calculate the 13-hour offset to align UTC with NZDT
  const thirteenHoursMs = 13 * 60 * 60 * 1000
  const aucklandNow = new Date(Date.now() + thirteenHoursMs)

  // 2. Clear existing data (Order matters: Chat first, then Users)
  await knex('chat').del()
  await knex('users').del()

  // 3. Seed Users
  await knex('users').insert([
    {
      auth0Id: 'seed-skipper-01',
      name: 'Nathan Outteridge',
      role: 'Skipper / Helm',
      profile_photo: '/images/another.jpeg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-helm-02',
      name: 'Peter Burling',
      role: 'Helmsman',
      profile_photo: '/images/iin.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-trimmer-03',
      name: 'Blair Tuke',
      role: 'Wing Trimmer',
      profile_photo: '/images/seed.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-cyclor-04',
      name: 'Andy Maloney',
      role: 'Cyclor',
      profile_photo: '/images/ql.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-cyclor-05',
      name: 'Josh Junior',
      role: 'Cyclor',
      profile_photo: '/images/rbo.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-engineer-06',
      name: 'Tom Morris',
      role: 'Performance Engineer',
      profile_photo: '/images/ton.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-analyst-07',
      name: 'Sarah McKenzie',
      role: 'Data Analyst',
      profile_photo: '/images/wom2.jpg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-coach-08',
      name: 'Ray Davies',
      role: 'Tactical Coach',
      profile_photo: '/images/ray.jpeg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-shore-09',
      name: 'Mike Sanderson',
      role: 'Shore Team Lead',
      profile_photo: '/images/wiin.jpeg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
    {
      auth0Id: 'seed-comms-10',
      name: 'Ella Thompson',
      role: 'Broadcast / Comms',
      profile_photo: '/images/wom.jpeg',
      is_seed_user: true,
      activity_status: aucklandNow,
    },
  ])

  // 4. Seed Chat Messages
  await knex('chat').insert([
    {
      message: 'True wind 19 knots, oscillating 5 degrees right.',
      auth0Id: 'seed-analyst-07',
    },
    {
      message: 'Foil cant stable at 118 degrees, boat speed above target.',
      auth0Id: 'seed-engineer-06',
    },
    { message: 'Ride height steady at 1.4 metres.', auth0Id: 'seed-helm-02' },
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
    {
      message: 'VMG optimized at 38 knots, tracking 2% above polars.',
      auth0Id: 'seed-analyst-07',
    },
    {
      message: 'Main flap angle increased to 12 degrees to maintain lift.',
      auth0Id: 'seed-engineer-06',
    },
    {
      message: 'Approaching port boundary, 200 metres to layline.',
      auth0Id: 'seed-coach-08',
    },
    {
      message: 'Accumulator at 95% capacity, ready for the bear-away.',
      auth0Id: 'seed-cyclor-04',
    },
    {
      message: 'Rudder pitch cavitation detected—adjusting rake now.',
      auth0Id: 'seed-engineer-06',
    },
    {
      message: 'Dropping the windward board. Stand by for rounding.',
      auth0Id: 'seed-skipper-01',
    },
    {
      message: 'Slight leeway increase, steering 2 degrees high of course.',
      auth0Id: 'seed-helm-02',
    },
    {
      message: 'Heart rates peaking at 185 BPM, power output steady.',
      auth0Id: 'seed-analyst-07',
    },
    {
      message: 'Clean air ahead, let’s hold this lane for the next 2 minutes.',
      auth0Id: 'seed-coach-08',
    },
  ])
}
