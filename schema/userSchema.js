function validateUser(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Request body is required."] };
  }

  const { name, email, age, course } = data;

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required.");
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("Email is required and must be valid.");
  }

  if (age === undefined || age === null || Number.isNaN(Number(age))) {
    errors.push("Age is required and must be a valid number.");
  } else if (Number(age) < 1 || Number(age) > 120) {
    errors.push("Age must be in a valid range.");
  }

  if (!course || typeof course !== "string" || course.trim() === "") {
    errors.push("Course is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validateUser };
