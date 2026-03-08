/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Registration from './components/Registration.tsx'

const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="/registration" element={<Registration />} />
  </>,
)

export default routes
