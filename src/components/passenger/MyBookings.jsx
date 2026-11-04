
function MyBookings() {

    return (

        <div>

            <h3 className="fw-bold text-dark mb-2">
                My Bookings
            </h3>

            <p className="text-secondary mb-4">
                View and manage all your bus bookings.
            </p>

            <div className="card border-0 shadow-sm">

                <div className="card-body text-center p-5">

                    <i className="bi bi-ticket-perforated display-3 text-secondary"></i>

                    <h5 className="fw-bold mt-3">
                        Your Bookings
                    </h5>

                    <p className="text-secondary mb-0">
                        Your booking history will appear here.
                    </p>

                </div>

            </div>

        </div>

    )

}

export default MyBookings
