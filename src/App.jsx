import { Routes, Route, Navigate } from "react-router"
import Login from "./components/auth/Login"
import PassengerLayout from "./components/passenger/PassengerLayout"
import SearchBuses from "./components/passenger/SearchBuses"
import MyBookings from "./components/passenger/MyBookings"
import UpcomingJourneys from "./components/passenger/UpcomingJourneys"
import MyProfile from "./components/passenger/MyProfile"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/passenger/:token" element={<PassengerLayout />}>
                <Route index element={<SearchBuses />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="upcoming" element={<UpcomingJourneys />} />
                <Route path="profile" element={<MyProfile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App