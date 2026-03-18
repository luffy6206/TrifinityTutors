import { useEffect, useState } from "react"
import StudentCard from "../components/StudentCard"

function TutorDashboard() {

  const [studentRequests, setStudentRequests] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/studentrequests")
      .then(res => res.json())
      .then(data => setStudentRequests(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Student Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {studentRequests.map((req) => (
          <StudentCard key={req._id} data={req} />
        ))}

      </div>

    </div>
  )
}

export default TutorDashboard