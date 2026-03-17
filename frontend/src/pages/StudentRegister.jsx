import { useState } from "react"

function StudentRegister() {

  const [form, setForm] = useState({
    name: "",
    class: "",
    subject: "",
    locality: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://localhost:5000/api/student",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    })

    alert("Student request submitted")

    // reset form
    setForm({
      name:"",
      class:"",
      subject:"",
      locality:""
    })
  }

  return (
    <div>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="class"
          value={form.class}
          placeholder="Class"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="subject"
          value={form.subject}
          placeholder="Subject"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="locality"
          value={form.locality}
          placeholder="Locality"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default StudentRegister