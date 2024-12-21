# EmailPassword

A lightweight npm package providing two essential utilities:
1. Email validation with comprehensive format checks.
2. Secure and customizable random password generation.

## Features

### Email Validation
- Supports standard email formats:
  - Basic: `user@example.com`
  - With dots: `user.name@example.com`
  - With plus: `user+tag@example.com`
  - With plus and dots: `user.name+tag@example.com`
  - With special characters: `user-name_123@sub.example.com`
- Detects invalid formats such as:
  - Consecutive dots: `user..name@example.com`
  - Dot at start/end: `.user@example.com` or `user.@example.com`
  - Invalid characters: `user*name@example.com`
  - Missing parts: `user@.com` or `@example.com`
- Validation rules:
  - Local part: Allows alphanumeric, dots, underscores, hyphens, plus signs.
  - Prevents dots at the start/end or consecutive dots.
  - Allows plus signs after the first character.
  - Domain: Allows alphanumeric, dots, hyphens.
  - TLD: Requires at least 2 alphabetic characters.

### Random Password Generator
- Generates secure random passwords.
- Customizable options:
  - Include numbers.
  - Include special characters.
  - Include alphabets (uppercase and lowercase).
- Default password length: 8 characters.
- Ensures inclusion of at least one character set if specified.

## Installation

Install the package using npm:

```bash
npm install emailpassword
```

## Usage

### Import the Package

```javascript
import EmailPassword from 'emailpassword';
```

### Email Validation

```javascript
const isValidEmail = EmailPassword.isValidEmail('example@example.com');

if (isValidEmail) {
  console.log('Valid email address');
} else {
  console.log('Invalid email address');
}
```

### Random Password Generator

```javascript
const password = EmailPassword.randomPasswordGenerator(12, {
  numbers: true,
  special: true,
  alphabets: true
});

console.log(`Generated Password: ${password}`);
```

## API

### `isValidEmail(email: string): boolean`
Validates if the provided email follows standard email formatting rules.

### `randomPasswordGenerator(length: number = 8, options: Object): string`
Generates a random password with the specified length and character set options.

- **Parameters**:
  - `length` (number): Length of the password (default: 8).
  - `options` (Object):
    - `numbers` (boolean): Include numbers (default: true).
    - `special` (boolean): Include special characters (default: true).
    - `alphabets` (boolean): Include alphabets (default: true).

## Example Project

Here is an example demonstrating both utilities:

```javascript
import EmailPassword from 'emailpassword';

// Validate an email
const email = 'user@example.com';
if (!EmailPassword.isValidEmail(email)) {
  console.log('Invalid email address');
} else {
  console.log('Valid email address');
}

// Generate a random password
const password = EmailPassword.randomPasswordGenerator(10, {
  numbers: true,
  special: true,
  alphabets: true
});
console.log(`Generated Password: ${password}`);
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this package.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to contact:

- **Author**: Saanvi Lakhanpal
- **GitHub**: [https://github.com/Saanvi26](https://github.com/Saanvi26)

---

Thank you for using `emailpassword`. We hope it simplifies your development process!
