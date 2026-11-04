
import { useEffect, useState } from "react"
import axios from "axios"
import { API_SERVER_URL_DEV } from "../../../config"

function SearchBuses() {

    const [stops, setStops] = useState([])

    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [travelDate, setTravelDate] = useState("")

    const [error, setError] = useState("")

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

                console.log(error)
                setError("Unable to load bus stops.")

            }

        }

        fetchStops()

    }, [])


    const today = new Date()

    const minDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0]


    const swapLocations = () => {

        setSource(destination)
        setDestination(source)

    }


    const searchBuses = (e) => {

        e.preventDefault()
        setError("")

        if (source === destination) {

            setError("Source and destination cannot be the same.")
            return

        }

        console.log("Source:", source)
        console.log("Destination:", destination)
        console.log("Travel Date:", travelDate)

        // Connect schedule search API next.

    }


    return (
        <div className="row justify-content-center">

            <div className="col-lg-9">

                <div className="mb-4">
                    <h3 className="fw-bold text-dark">Search Buses</h3>
                    <p className="text-secondary">
                        Find and book your next bus journey with FastX.
                    </p>
                </div>

                <div className="card border-0 shadow-sm rounded-3">

                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-4">
                            <i className="bi bi-bus-front me-2"></i>
                            Where would you like to go?
                        </h5>

                        <form onSubmit={searchBuses}>

                            <div className="row g-3 align-items-end">

                                <div className="col-md-5">

                                    <label className="form-label fw-semibold">
                                        From
                                    </label>

                                    <select
                                        className="form-select"
                                        value={source}
                                        onChange={e => setSource(e.target.value)}
                                        required
                                    >
                                        <option value="">Select source</option>

                                        {stops.map(stop => (
                                            <option
                                                key={stop.id}
                                                value={stop.id}
                                            >
                                                {stop.location}
                                            </option>
                                        ))}

                                    </select>

                                </div>

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

                                <div className="col-md-5">

                                    <label className="form-label fw-semibold">
                                        To
                                    </label>

                                    <select
                                        className="form-select"
                                        value={destination}
                                        onChange={e => setDestination(e.target.value)}
                                        required
                                    >
                                        <option value="">Select destination</option>

                                        {stops.map(stop => (
                                            <option
                                                key={stop.id}
                                                value={stop.id}
                                            >
                                                {stop.location}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-7">

                                    <label className="form-label fw-semibold">
                                        Journey Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        min={minDate}
                                        value={travelDate}
                                        onChange={e => setTravelDate(e.target.value)}
                                        required
                                    />

                                </div>

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

                            {error && (
                                <div className="alert alert-danger mt-3 mb-0">
                                    {error}
                                </div>
                            )}

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchBuses