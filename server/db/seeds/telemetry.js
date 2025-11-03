/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  const sensors = [
    'sensor-1',
    'sensor-2',
    'sensor-3',
    'sensor-4',
    'sensor-5',
    'sensor-6',
    'sensor-7',
    'sensor-8',
    'sensor-9',
    'sensor-10',
  ]
  const seedData = sensors.map((id) => ({
    sensor_id: id,
    time_stamp: new Date(),
    speed: parseFloat((Math.random() * 120).toFixed(2)),
    temperature: parseFloat((15 + Math.random() * 10).toFixed(2)),
    battery: parseFloat((50 + Math.random() * 50).toFixed(1)),
    altitude: parseFloat((100 + Math.random() * 50).toFixed(2)),
  }))
  await knex('telemetry').insert(seedData)
}
