const express = require("express");
const inferSubject = require("./subjectClassifier");
const app = express();
app.use(express.json());

/**
 * POST /flashcard
 * Add a flashcard with automatic subject inference
 */
const flashcards = [];

app.post("/flashcard", (req, res) => {
  const { student_id, question, answer } = req.body;

  if (!student_id || !question || !answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const subject = inferSubject(question);

  flashcards.push({
    student_id,
    question,
    answer,
    subject,
  });

  res.json({
    message: "Flashcard added successfully",
    subject,
  });
});

/**
 * GET /get-subject
 * Return mixed-subject flashcards for a student
 */
app.get("/get-subject", (req, res) => {
  const { student_id, limit = 5 } = req.query;

  if (!student_id) {
    return res.status(400).json({ error: "student_id is required" });
  }

  const studentCards = flashcards.filter(
    (card) => card.student_id === student_id
  );

  // Shuffle cards to mix subjects
  const shuffled = studentCards.sort(() => Math.random() - 0.5);

  res.json(shuffled.slice(0, Number(limit)));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
