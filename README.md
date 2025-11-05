# Live Telemetry Simulator and Dashboard

## Link to deployed dashboard -> https://etnz-dashboard.borb.nz/

![Node.js CI](https://github.com/MatthewFcode/ETNZ-Dashboard/actions/workflows/nodejs-sqlite-ci.yml/badge.svg)

This project simulates the process of sending **live telemetry data** through a full-stack setup with optimized performance. It demonstrates how to handle rapidly updating data while minimizing UI re-renders in React.

Telemetry data is generated randomly from a **JavaScript script running on the server**, updating existing data entries every **100ms**, simulating a real-time data feed.

A **WebSocket server** notifies the client when database changes occur. React Query is used to refetch query keys, but this refetching is **throttled to 700ms** to:
- Ensure data readability when displayed.
- Prevent excessive re-renders that could overload the React UI.

Additionally, **`useContext()`** is employed to globalize React Query data, making it accessible across the entire React component tree.

## Features
- Real-time telemetry simulation
- Throttled React Query refetching for performance optimization
- Full-stack architecture with WebSocket updates
- Global state management using React Context
- Responsive dashboard UI for telemetry visualization