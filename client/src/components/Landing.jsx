
import React, { useState } from "react"
import { Card, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  console.log("current user", currentUser)
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert severity="error">{error}</Alert>}
          {/* <strong>Email:</strong> {currentUser.email} */}
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}