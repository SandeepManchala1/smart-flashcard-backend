const SUBJECT_KEYWORDS = {
  Physics: ["force", "newton", "energy", "motion", "mass"],
  Biology: ["photosynthesis", "cell", "plant", "enzyme"],
  Chemistry: ["atom", "reaction", "acid", "base"],
  Mathematics: ["equation", "integral", "algebra"],
};

function inferSubject(text) {
  const lower = text.toLowerCase();

  for (const subject in SUBJECT_KEYWORDS) {
    if (SUBJECT_KEYWORDS[subject].some((k) => lower.includes(k))) {
      return subject;
    }
  }
  return "General";
}

module.exports = inferSubject;
