
function UpcomingJourneys() {

    return (

        <div>

            <h3 className="fw-bold text-dark mb-2">
                Upcoming Journeys
            </h3>

            <p className="text-secondary mb-4">
                View your confirmed upcoming bus journeys.
            </p>

            <div className="card border-0 shadow-sm">

                <div className="card-body text-center p-5">

                    <i className="bi bi-calendar-check display-3 text-secondary"></i>

                    <h5 className="fw-bold mt-3">
                        No Upcoming Journeys
                    </h5>

                    <p className="text-secondary mb-0">
                        Your confirmed future journeys will appear here.
                    </p>

                </div>

            </div>

        </div>

    )

}

export default UpcomingJourneys
