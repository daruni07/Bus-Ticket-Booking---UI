
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { API_SERVER_URL_DEV } from "../../../config"
import axios from "axios"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [errComment, setErrComment] = useState("")

    const apiUrl = API_SERVER_URL_DEV + '/api/auth/login'
    const userDetailsUrl = API_SERVER_URL_DEV + '/api/auth/user-details'

    const navigate = useNavigate()

    const processLogin = async (e) => {
        e.preventDefault()

        // Step 1: Fetch JWT token
        const token = 'Basic ' + window.btoa(username + ':' + password)

        try {
            const response = await axios.get(apiUrl, {
                headers: { 'Authorization': token }
            })

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', username)
            
            // Step 2: Fetch user details using JWT
            const resp = await axios.get(userDetailsUrl, {
                headers: {
                    'Authorization': 'Bearer ' + response.data.token
                }
            })
            localStorage.setItem('userDetails', JSON.stringify(resp.data))

            localStorage.setItem('role', resp.data.role)

            // Step 3: Navigate based on role
            switch (resp.data.role) {
                case 'PASSENGER':
                    navigate(`/passenger/${response.data.token}`)
                    break

                case 'BUS_OPERATOR':
                    navigate(`/operator/${response.data.token}`)
                    break

                case 'ADMIN':
                    navigate(`/admin/${response.data.token}`)
                    break

                default:
                    setErrMsg('Something went wrong...')
                    break
            }
        }
        catch (err) {
            if (err?.response?.data === undefined) {
                setErrMsg("Invalid Credentials")
            }
            else {
                console.log(err?.response?.data)
                setErrMsg(err?.response?.data?.message)
                setErrComment(err?.response?.data?.comments)
            }
        }
    }

    return (
    <div className="container-fluid bg-body-secondary min-vh-100 d-flex align-items-center justify-content-center">

    <div className="container">
        <div className="row justify-content-center">

            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">

                <div className="card border-0 shadow-lg rounded-4">
                    <div className="card-body p-3 p-sm-4">

                        <div className="text-center mb-4">

                            <i className="bi bi-bus-front-fill text-secondary fs-1"></i>

                            <h2 className="fw-bold text-dark mt-2">
                                FastX
                            </h2>

                            <p className="text-secondary">
                                Your journey begins here.
                            </p>

                        </div>

                        <div className="text-center mb-3">
                            <p className="text-danger fw-semibold">{errMsg}</p>
                            <p className="text-secondary small">{errComment}</p>
                        </div>

                        <form onSubmit={(e) => processLogin(e)}>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="d-grid mb-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-dark fw-semibold"
                                >
                                    Sign In
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-secondary small mb-0">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/passenger/signup"
                                        className="text-dark fw-semibold text-decoration-none"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                        </form>

                    </div>
                </div>

                <p className="text-center text-secondary small mt-4">
                    FastX – Travel smarter, travel better.
                </p>

            </div>
        </div>
    </div>
</div>
)
}

export default Login
