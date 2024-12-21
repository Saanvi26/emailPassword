// Define regex components with descriptive names
const LOCAL_PART_START = "[a-zA-Z0-9]";
const LOCAL_PART_MIDDLE = "(?!.*\\.\\.)[a-zA-Z0-9._+-]*"; // Prevent consecutive dots
const LOCAL_PART_PLUS = "(?:\\+[a-zA-Z0-9._+-]+)?"; // Plus sign handling after the first character
const LOCAL_PART_END = "[a-zA-Z0-9]";
const DOMAIN_START = "[a-zA-Z0-9]";
const DOMAIN_MIDDLE = "(?!.*\\.\\.)[a-zA-Z0-9.-]*"; // Prevent consecutive dots in domain part
const DOMAIN_END = "[a-zA-Z0-9]";
const TLD = "[a-zA-Z]{2,}";

// Combine components into full email regex
const emailRegex = new RegExp(
  `^${LOCAL_PART_START}${LOCAL_PART_MIDDLE}${LOCAL_PART_END}${LOCAL_PART_PLUS}@${DOMAIN_START}${DOMAIN_MIDDLE}${DOMAIN_END}\\.${TLD}$`
);

/**
 * Validates if the provided email has a correct format.
 *
 * Valid email formats:
 * - Basic: user@example.com
 * - With dots: user.name@example.com
 * - With plus: user+tag@example.com
 * - With plus and dots: user.name+tag@example.com
 * - With special chars: user-name_123@sub.example.com
 *
 * Invalid email formats:
 * - Consecutive dots: user..name@example.com
 * - Dot at start/end: .user@example.com or user.@example.com
 * - Invalid chars: user*name@example.com
 * - Missing parts: user@.com or @example.com
 *
 * Validation rules:
 * - Local part: Allows alphanumeric, dots, underscores, hyphens, plus signs
 * - Dots cannot be first/last or consecutive
 * - Plus sign allowed after first character
 * - Domain: Allows alphanumeric, dots, hyphens
 * - TLD: At least 2 characters, alphabetic only
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if email is valid, else false.
 */
function isValidEmail(email) {
  console.log("Validating email: ", email);
  // Handle null/undefined/empty inputs
  if (email === null || email === undefined) {
    return false;
  }

  // Validate input type
  if (typeof email !== "string") {
    return false;
  }

  // Handle empty string
  if (email.trim() === "") {
    return false;
  }

  // Sanitize input
  email = email.trim().toLowerCase();

  // Updated regex pattern with plus sign support
  return emailRegex.test(email);
}

/**
 * Generates a random password of specified length.
 * @param {number} [length=8] - The length of the password to generate.
 * @param {Object} [options] - Password generation options
 * @param {boolean} [options.numbers=true] - Include numbers in password
 * @param {boolean} [options.special=true] - Include special characters in password
 * @param {boolean} [options.alphabets=true] - Include alphabets in password
 * @returns {string} - The generated password.
 */
// Note: For production use, consider using crypto.randomBytes() instead of Math.random()
// for cryptographically secure password generation
function randomPasswordGenerator(
  length = 8,
  options = { numbers: true, special: true, alphabets: true }
) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allChars = "";
  if (options.alphabets) {
    allChars += upperCase + lowerCase;
  }
  if (options.numbers) {
    allChars += numbers;
  }
  if (options.special) {
    allChars += special;
  }

  // Ensure at least one character set is included
  if (allChars === "") {
    allChars = upperCase + lowerCase; // Default to alphabets if nothing selected
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}
export default { isValidEmail, randomPasswordGenerator };
