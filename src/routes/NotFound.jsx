import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div style={{ color: "black", textAlign: "center", padding: "2rem" }}>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#646cff" }}>
        Go back to Home
      </Link>
    </div>
  )
}

export default NotFound