import connection from '../db/connection.ts'
import ws from 'ws'

const db = connection

function generateTelemetry(sensorId) {
  return {
    sensor_id: sensorId,
    time_stamp: new Date().toISOString(),
    speed: parseFloat((Math.random() * 35).toFixed(2)),
    temperature: parseFloat((15 + Math.random() * 10).toFixed(2)),
    battery: parseFloat((50 + Math.random() * 50).toFixed(1)),
    altitude: parseFloat((100 + Math.random() * 50).toFixed(2)), // meters above sea level
  }
}

export async function startTelemetryGeneration(wss) {
  // declare an array of sensors 15 all producing the same data
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
    'sensor-11',
    'sensor-12',
    'sensor-13',
    'sensor-14',
    'sensor-15',
  ]
  console.log('starting telemetry stream')

  setInterval(async () => {
    for (const id of sensors) {
      const telemetry = generateTelemetry(id)
      await db('telemetry').where('telemetry.sensor_id', id).update(telemetry)
      await db('historical_data').insert(telemetry)

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: 'database_change',
              message: 'New telemetry data',
            }),
          )
        }
      })
    }
  }, 200)
}
