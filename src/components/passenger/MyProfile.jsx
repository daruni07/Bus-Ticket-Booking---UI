
function MyProfile() {

    const username = localStorage.getItem("username")

    return (

        <div>

            <h3 className="fw-bold text-dark mb-2">
                My Profile
            </h3>

            <p className="text-secondary mb-4">
                View your passenger account details.
            </p>

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <div className="text-center mb-4">

                        <i className="bi bi-person-circle display-1 text-secondary"></i>

                        <h5 className="fw-bold mt-3">
                            {username}
                        </h5>

                        <span className="badge bg-secondary">
                            Passenger
                        </span>

                    </div>

                    <hr />

                    <label className="form-label text-secondary">
                        Username
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={username || ""}
                        readOnly
                    />

                </div>

            </div>

        </div>

    )

}

export default MyProfile
