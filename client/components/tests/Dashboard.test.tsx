// import { render, screen } from '@testing-library/react'
// import { describe, it, expect, vi } from 'vitest'
// import Dashboard from '../Dashboard.tsx'
// import { useTelemetry } from '../Context.tsx'
// import { TelemetryDataCamel } from '../../../models/telemetry.ts'

// // Mock the useTelemetry hook from the Context module
// vi.mock('../Context.tsx', () => ({
//   useTelemetry: vi.fn(),
// }))

// describe('Dashboard Component UI Tests', () => {
//   it('should display a loading message when data is pending', () => {
//     // Arrange: Mock the hook to return a pending state
//     ;(useTelemetry as ReturnType<typeof vi.fn>).mockReturnValue({
//       data: [],
//       isPending: true,
//       isError: false,
//     })

//     // Act: Render the component
//     render(<Dashboard />)

//     // Assert: Check if the loading text is on the screen
//     expect(screen.getByText('Loading Telemetry Data...')).not.toBeNull()
//   })

//   it('should display an error message when there is an error', () => {
//     // Arrange: Mock the hook to return an error state
//     ;(useTelemetry as ReturnType<typeof vi.fn>).mockReturnValue({
//       data: [],
//       isPending: false,
//       isError: true,
//     })

//     // Act: Render the component
//     render(<Dashboard />)

//     // Assert: Check if the error text is on the screen
//     expect(screen.getByText('Error Loading Telemetry Data')).not.toBeNull()
//   })

//   it('should render sensor cards correctly with telemetry data', () => {
//     // Arrange: Mock the hook to return sample data
//     const mockData: TelemetryDataCamel[] = [
//       {
//         sensorId: 'sensor-alpha',
//         timeStamp: new Date().toISOString(),
//         speed: 25.5,
//         temperature: 20.1,
//         battery: 88.9,
//         altitude: 110.2,
//       },
//       {
//         sensorId: 'sensor-beta',
//         timeStamp: new Date().toISOString(),
//         speed: 30.2,
//         temperature: 19.5,
//         battery: 75.4,
//         altitude: 115.8,
//       },
//     ]
//     ;(useTelemetry as ReturnType<typeof vi.fn>).mockReturnValue({
//       data: mockData,
//       isPending: false,
//       isError: false,
//     })

//     // Act: Render the component
//     render(<Dashboard />)

//     // Assert: Check if the sensor data is rendered
//     // Check for sensor IDs (which are in h2 elements)
//     expect(screen.getByRole('heading', { name: 'sensor-1' })).not.toBeNull()
//     expect(screen.getByRole('heading', { name: 'sensor-1' })).not.toBeNull()

//     // Check for specific data points
//     expect(screen.getByText(expect.any(Number))).not.toBeNull() // Speed of sensor-alpha
//     expect(screen.getByText(expect.any(Number))).not.toBeNull() // Temperature of sensor-beta
//     expect(screen.getByText(expect.any(Number))).not.toBeNull() // Battery of sensor-beta
//   })
// })
