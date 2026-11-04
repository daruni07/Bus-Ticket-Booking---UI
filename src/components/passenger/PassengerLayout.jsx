import { NavLink, Outlet, useNavigate, useParams } from "react-router"

function PassengerLayout() {

    const { token } = useParams()
    const navigate = useNavigate()

    const username = localStorage.getItem("username")

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")

        navigate("/")
    }

    const navLinkClass = ({ isActive }) =>
        `btn btn-sm rounded-2 px-3 ${
            isActive
                ? "btn-light text-dark fw-semibold"
                : "btn-dark text-white"
        }`

    return (
        <div className="min-vh-100 bg-light">

            {/* TOP BRAND NAVBAR */}
            <nav className="navbar navbar-dark bg-dark py-3">
                <div className="container-fluid px-3 px-md-4">

                    <NavLink
                        to={`/passenger/${token}`}
                        className="navbar-brand fw-bold fs-3 mb-0"
                    >
                        <i className="bi bi-bus-front-fill me-2"></i>
                        FastX
                    </NavLink>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white d-none d-sm-inline">
                            <i className="bi bi-person-circle me-2"></i>
                            {username || "Passenger"}
                        </span>

                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-person me-1"></i>
                                Account
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                    <NavLink
                                        to={`/passenger/${token}/profile`}
                                        className="dropdown-item"
                                    >
                                        <i className="bi bi-person me-2"></i>
                                        My Profile
                                    </NavLink>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </button>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </nav>


            {/* SECOND NAVIGATION ROW */}
            <div className="bg-dark border-top border-secondary">
                <div className="container-fluid px-3 px-md-4 py-2">

                    <div className="d-flex flex-wrap align-items-center gap-2">

                        <NavLink
                            to={`/passenger/${token}`}
                            end
                            className={navLinkClass}
                        >
                            <i className="bi bi-search me-2"></i>
                            Search Buses
                        </NavLink>

                        <NavLink
                            to={`/passenger/${token}/bookings`}
                            className={navLinkClass}
                        >
                            <i className="bi bi-ticket-perforated me-2"></i>
                            My Bookings
                        </NavLink>

                        <NavLink
                            to={`/passenger/${token}/upcoming`}
                            className={navLinkClass}
                        >
                            <i className="bi bi-calendar-check me-2"></i>
                            Upcoming Journeys
                        </NavLink>

                        <NavLink
                            to={`/passenger/${token}/profile`}
                            className={navLinkClass}
                        >
                            <i className="bi bi-person me-2"></i>
                            My Profile
                        </NavLink>

                    </div>

                </div>
            </div>


            {/* PAGE CONTENT */}
            <main className="container-fluid px-3 px-md-4 py-4">
                <Outlet />
            </main>

        </div>
    )
}

export default PassengerLayout