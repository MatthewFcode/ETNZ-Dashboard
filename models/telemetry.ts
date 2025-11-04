export interface TelemetryDataSnake {
  sensor_id: string
  time_stamp: string
  speed: number
  temperature: number
  battery: number
  altitude: number
}

export interface TelemetryDataCamel {
  sensorId: string
  timeStamp: string
  speed: number
  temperature: number
  battery: number
  altitude: number
}
