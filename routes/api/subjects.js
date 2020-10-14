const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Subjects = require("../../models/Subjects");
const User = require("../../models/User");

// @route    POST api/subjects
// @desc     Create a subject
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      body("subject", "Subject is required").not().isEmpty(),
      body("instructorFirst", "Instructor's first name is required")
        .not()
        .isEmpty(),
      body("instructorLast", "Instructor's last name is required")
        .not()
        .isEmpty(),
      body("startTime", "Specify start time").not().isEmpty(),
      body("endTime", "Specify end time").not().isEmpty(),
      body("background", "Insert background").not().isEmpty(),
      body("description", "Describe the subject").not().isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const admin = user.status;

      const {
        subject,
        instructorFirst,
        instructorLast,
        startTime,
        endTime,
        background,
        description,
        studentSubjects,
        instructorSubjects
      } = req.body;

      if (admin === "Admin") {
        const newSubject = new Subjects({
          subject: subject,
          instructorFirst: instructorFirst,
          instructorLast: instructorLast,
          startTime: startTime,
          endTime: endTime,
          background: background,
          description: description,
          studentSubjects: studentSubjects,
          instructorSubjects: instructorSubjects
        });

        const theSubject = await newSubject.save();

        res.json(theSubject);
      } else {
        res.status(404).send("You must be an admin to create a new subject");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
0
// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", async (req, res) => {
  try {
    const subjects = await Subjects.find().sort({ date: -1 });
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get specific subject
router.get('/:id', auth, async (req, res ) => {
  try {
    const subject = await Subjects.findById(req.params.id);

    if(!subject || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(subject);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;
