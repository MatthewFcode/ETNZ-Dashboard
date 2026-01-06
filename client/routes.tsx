/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Registration from './components/Registration.tsx'
import UserActivity from './components/UserActivity.tsx'

const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/activity" element={<UserActivity />} />
  </>,
)

export default routes
