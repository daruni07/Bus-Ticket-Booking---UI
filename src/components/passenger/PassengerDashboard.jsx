
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { API_SERVER_URL_DEV } from "../../../config"

function PassengerDashboard() {

    const navigate = useNavigate()

    const username = localStorage.getItem("username")

    const [stops, setStops] = useState([])
    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [travelDate, setTravelDate] = useState("")
    const [activeTab, setActiveTab] = useState("search")

    // Fetch all stops
    useEffect(() => {

        const fetchStops = async () => {

            const token = localStorage.getItem("token")

            try {

                const response = await axios.get(
                    API_SERVER_URL_DEV + "/api/stop/getAll",
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                )

                setStops(response.data)

            } catch (error) {

                console.log("Error fetching stops:", error)

            }
        }

        fetchStops()

    }, [])

    // Minimum travel date
    const today = new Date()

    const minDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0]

    // Swap source and destination
    const swapLocations = () => {

        setSource(destination)
        setDestination(source)

    }

    // Search buses
    const searchBuses = (e) => {

        e.preventDefault()

        if (source === destination) {
            alert("Source and destination cannot be the same")
            return
        }

        if (!source || !destination || !travelDate) {
            alert("Please select all the required details")
            return
        }

        console.log("Source:", source)
        console.log("Destination:", destination)
        console.log("Travel Date:", travelDate)

        // We will connect the Search Buses API here next.
    }

    // Logout
    const logout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")

        navigate("/")

    }

    // Tab navigation
    const changeTab = (tab) => {

        setActiveTab(tab)

    }

    return (

        <div className="min-vh-100 bg-light">

            {/* Navbar */}

            <nav className="navbar navbar-dark bg-dark shadow-sm">

                <div className="container">

                    <span className="navbar-brand fw-bold fs-4">
                        <i className="bi bi-bus-front-fill me-2"></i>
                        FastX
                    </span>

                    <div className="dropdown">

                        <button
                            className="btn btn-dark dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            {username}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">

                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => changeTab("profile")}
                                >
                                    <i className="bi bi-person me-2"></i>
                                    My Profile
                                </button>
                            </li>

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <button
                                    className="dropdown-item text-danger"
                                    onClick={logout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </button>
                            </li>

                        </ul>

                    </div>

                </div>

            </nav>


            {/* Welcome Section */}

            <div className="container mt-5">

                <div className="text-center mb-4">

                    <h2 className="fw-bold text-dark">
                        Welcome, {username}!
                    </h2>

                    <p className="text-secondary">
                        Where would you like to travel today?
                    </p>

                </div>


                {/* Navigation Tabs */}

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <ul className="nav nav-tabs nav-fill mb-4">

                            <li className="nav-item">

                                <button
                                    className={`nav-link ${activeTab === "search" ? "active" : "text-dark"}`}
                                    onClick={() => changeTab("search")}
                                >
                                    <i className="bi bi-search me-2"></i>
                                    Search Buses
                                </button>

                            </li>

                            <li className="nav-item">

                                <button
                                    className={`nav-link ${activeTab === "bookings" ? "active" : "text-dark"}`}
                                    onClick={() => changeTab("bookings")}
                                >
                                    <i className="bi bi-ticket-perforated me-2"></i>
                                    My Bookings
                                </button>

                            </li>

                            <li className="nav-item">

                                <button
                                    className={`nav-link ${activeTab === "upcoming" ? "active" : "text-dark"}`}
                                    onClick={() => changeTab("upcoming")}
                                >
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Upcoming Journeys
                                </button>

                            </li>

                            <li className="nav-item">

                                <button
                                    className={`nav-link ${activeTab === "profile" ? "active" : "text-dark"}`}
                                    onClick={() => changeTab("profile")}
                                >
                                    <i className="bi bi-person me-2"></i>
                                    My Profile
                                </button>

                            </li>

                        </ul>


                        {/* Search Buses Tab */}

                        {activeTab === "search" && (

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h4 className="fw-bold text-dark mb-4">
                                        <i className="bi bi-bus-front me-2"></i>
                                        Search Buses
                                    </h4>

                                    <form onSubmit={searchBuses}>

                                        <div className="row align-items-end g-3">

                                            {/* Source */}

                                            <div className="col-md-5">

                                                <label className="form-label fw-semibold">
                                                    From
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={source}
                                                    onChange={(e) => setSource(e.target.value)}
                                                    required
                                                >

                                                    <option value="">
                                                        Select Source
                                                    </option>

                                                    {stops.map((stop) => (

                                                        <option
                                                            key={stop.id}
                                                            value={stop.id}
                                                        >
                                                            {stop.location}
                                                        </option>

                                                    ))}

                                                </select>

                                            </div>


                                            {/* Swap Button */}

                                            <div className="col-md-2 text-center">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary rounded-circle"
                                                    onClick={swapLocations}
                                                    title="Swap locations"
                                                >
                                                    <i className="bi bi-arrow-left-right"></i>
                                                </button>

                                            </div>


                                            {/* Destination */}

                                            <div className="col-md-5">

                                                <label className="form-label fw-semibold">
                                                    To
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                    required
                                                >

                                                    <option value="">
                                                        Select Destination
                                                    </option>

                                                    {stops.map((stop) => (

                                                        <option
                                                            key={stop.id}
                                                            value={stop.id}
                                                        >
                                                            {stop.location}
                                                        </option>

                                                    ))}

                                                </select>

                                            </div>


                                            {/* Travel Date */}

                                            <div className="col-md-7">

                                                <label className="form-label fw-semibold">
                                                    Travel Date
                                                </label>

                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={travelDate}
                                                    min={minDate}
                                                    onChange={(e) => setTravelDate(e.target.value)}
                                                    required
                                                />

                                            </div>


                                            {/* Search Button */}

                                            <div className="col-md-5">

                                                <button
                                                    type="submit"
                                                    className="btn btn-dark w-100"
                                                >
                                                    <i className="bi bi-search me-2"></i>
                                                    Search Buses
                                                </button>

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        )}


                        {/* My Bookings Tab */}

                        {activeTab === "bookings" && (

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-5 text-center">

                                    <i className="bi bi-ticket-perforated display-4 text-secondary"></i>

                                    <h4 className="fw-bold mt-3">
                                        My Bookings
                                    </h4>

                                    <p className="text-secondary mb-0">
                                        Your booking history will appear here.
                                    </p>

                                </div>

                            </div>

                        )}


                        {/* Upcoming Journeys Tab */}

                        {activeTab === "upcoming" && (

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-5 text-center">

                                    <i className="bi bi-calendar-check display-4 text-secondary"></i>

                                    <h4 className="fw-bold mt-3">
                                        Upcoming Journeys
                                    </h4>

                                    <p className="text-secondary">
                                        Your confirmed upcoming journeys will appear here.
                                    </p>

                                    <p className="text-secondary small mb-0">
                                        You can access your E-Ticket from an eligible upcoming journey.
                                    </p>

                                </div>

                            </div>

                        )}


                        {/* My Profile Tab */}

                        {activeTab === "profile" && (

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-5 text-center">

                                    <i className="bi bi-person-circle display-4 text-secondary"></i>

                                    <h4 className="fw-bold mt-3">
                                        My Profile
                                    </h4>

                                    <p className="text-secondary mb-2">
                                        Username
                                    </p>

                                    <h5 className="fw-semibold">
                                        {username}
                                    </h5>

                                    <p className="text-secondary small mb-0">
                                        Your profile details will appear here.
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* Footer */}

            <footer className="text-center text-secondary py-4 mt-5">

                <small>
                    © {new Date().getFullYear()} FastX. All Rights Reserved.
                </small>

            </footer>

        </div>

    )

}

export default PassengerDashboard
