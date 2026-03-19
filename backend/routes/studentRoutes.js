const express = require("express")
const router = express.Router()

const StudentRequest = require("../models/StudentRequest")

const Application = require("../models/Application")

const auth = require("../middleware/auth");

router.post("/student", async (req,res)=>{

  const data = new StudentRequest(req.body)

  await data.save()

  res.json({message:"Student request saved"})

})
router.get("/", async (req, res) => {
  try {
    const data = await StudentRequest.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/apply", async (req, res) => {

  try {

    const { tutorName, studentRequestId } = req.body

    const existing = await Application.findOne({
      tutorName,
      studentRequestId
    })

    if (existing) {
      return res.json({ message: "Already applied" })
    }

    const application = new Application({
      tutorName,
      studentRequestId
    })

    await application.save()

    res.json({ message: "Application submitted" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})


// GET students with applications
router.get("/with-applications", auth, async (req, res) => {
  try {
    const students = await StudentRequest.find();
    const applications = await Application.find();

    const result = students.map((student) => {
      const relatedApps = applications.filter(
        (app) =>
          app.studentRequestId.toString() === student._id.toString()
      );

      return {
        ...student._doc,
        applications: relatedApps
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ APPROVE
router.put("/approve/:id", auth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    // ✅ Accept selected tutor
    await Application.findByIdAndUpdate(req.params.id, {
      status: "accepted"
    });

    // ❌ Reject all others for same student
    await Application.updateMany(
      {
        studentRequestId: app.studentRequestId,
        _id: { $ne: req.params.id }
      },
      { status: "rejected" }
    );

    res.json({ msg: "Tutor approved and others rejected" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ REJECT
router.put("/reject/:id", auth, async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ msg: "Tutor rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET total students count
router.get("/count", auth, async (req, res) => {
  const count = await StudentRequest.countDocuments();
  res.json({ count });
});

// protected route of authenticated admins to view all student requests
// router.get("/", auth, async (req, res) => {
//   const data = await Student.find();
//   res.json(data);
// });

module.exports = router