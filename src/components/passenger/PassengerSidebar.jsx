
import { NavLink } from "react-router"

function PassengerSidebar({ token, onLogout }) {

    const menuItems = [

        {
            title: "Search Buses",
            icon: "bi-search",
            path: `/passenger/${token}`,
            end: true
        },

        {
            title: "My Bookings",
            icon: "bi-ticket-perforated",
            path: `/passenger/${token}/bookings`
        },

        {
            title: "Upcoming Journeys",
            icon: "bi-calendar-check",
            path: `/passenger/${token}/upcoming`
        },

        {
            title: "My Profile",
            icon: "bi-person",
            path: `/passenger/${token}/profile`
        }

    ]

    return (

        <aside className="col-md-2 col-12 bg-dark text-white min-vh-100 p-3">

            {/* Brand */}

            <h4 className="fw-bold mb-5">
                <i className="bi bi-bus-front me-2"></i>
                FastX
            </h4>


            {/* Menu Heading */}

            <p className="text-secondary small fw-semibold">
                PASSENGER MENU
            </p>


            {/* Navigation */}

            <div className="d-flex flex-column gap-2">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.title}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `btn text-start d-flex align-items-center gap-3 ${
                                isActive
                                    ? "btn-light text-dark"
                                    : "btn-dark text-white"
                            }`
                        }
                    >

                        <i className={`bi ${item.icon} fs-5`}></i>

                        <span>{item.title}</span>

                    </NavLink>

                ))}

            </div>


            {/* Logout */}

            <div className="mt-5">

                <button
                    className="btn btn-dark text-white w-100 text-start"
                    onClick={onLogout}
                >

                    <i className="bi bi-box-arrow-right fs-5 me-3"></i>

                    Logout

                </button>

            </div>

        </aside>

    )

}

export default PassengerSidebar
