const { isValidEmail, randomPasswordGenerator } =
  require("emailpassword").default;

// Helper function to check if password contains specific character types
function checkPasswordComposition(password, options) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

  if (options.alphabets && !(hasUpperCase || hasLowerCase)) return false;
  if (options.numbers && !hasNumbers) return false;
  if (options.special && !hasSpecial) return false;
  return true;
}

class TestRunner {
  constructor() {
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.startTime = Date.now();
  }

  group(name, fn) {
    console.group(name);
    fn();
    console.groupEnd();
  }

  test(name, fn) {
    this.totalTests++;
    const testStart = Date.now();
    try {
      fn();
      this.passedTests++;
      console.log(`✅ PASS: ${name} (${Date.now() - testStart}ms)`);
    } catch (error) {
      this.failedTests++;
      console.log(`❌ FAIL: ${name} (${Date.now() - testStart}ms)`);
      console.log(`   Error: ${error.message}`);
    }
  }

  printSummary() {
    const totalTime = Date.now() - this.startTime;
    console.log("\nTest Summary:");
    console.log(`Total Tests: ${this.totalTests}`);
    console.log(`Passed: ${this.passedTests} ✅`);
    console.log(`Failed: ${this.failedTests} ❌`);
    console.log(`Total Time: ${totalTime}ms`);
  }
}

const runner = new TestRunner();

// Email Validation Tests
runner.group("Email Validation Tests", () => {
  // Valid email formats
  runner.group("Valid Email Formats", () => {
    runner.test("should validate standard email format", () => {
      if (!isValidEmail("user@example.com"))
        throw new Error("Expected true for valid email");
    });

    runner.test("should validate email with subdomain", () => {
      if (!isValidEmail("user@sub.example.com"))
        throw new Error("Expected true for email with subdomain");
    });

    runner.test("should validate email with international domain", () => {
      if (!isValidEmail("user@example.co.uk"))
        throw new Error("Expected true for international domain");
    });
  });

  // Invalid email formats
  runner.group("Invalid Email Formats", () => {
    runner.test("should reject email without @", () => {
      if (isValidEmail("userexample.com"))
        throw new Error("Expected false for email without @");
    });

    runner.test("should reject email with invalid TLD", () => {
      if (isValidEmail("user@example.c"))
        throw new Error("Expected false for invalid TLD");
    });

    runner.test("should reject email with consecutive dots", () => {
      if (isValidEmail("user..name@example.com"))
        throw new Error("Expected false for consecutive dots");
    });
  });

  // Edge cases
  runner.group("Edge Cases", () => {
    runner.test("should handle empty string", () => {
      if (isValidEmail("")) throw new Error("Expected false for empty string");
    });

    runner.test("should handle null", () => {
      if (isValidEmail(null)) throw new Error("Expected false for null");
    });

    runner.test("should handle undefined", () => {
      if (isValidEmail(undefined))
        throw new Error("Expected false for undefined");
    });

    runner.test(
      "should validate email with special characters in local part",
      () => {
        if (!isValidEmail("user.name+tag@example.com"))
          throw new Error("Expected true for email with special characters");
      }
    );
  });
});

// Password Generator Tests
runner.group("Password Generator Tests", () => {
  // Default behavior
  runner.group("Default Behavior", () => {
    runner.test("should generate password with default length of 8", () => {
      const password = randomPasswordGenerator();
      if (password.length !== 8)
        throw new Error("Expected password length to be 8");
      if (
        !checkPasswordComposition(password, {
          numbers: true,
          special: true,
          alphabets: true,
        })
      ) {
        throw new Error("Password composition check failed");
      }
    });
  });

  // Custom lengths
  runner.group("Custom Lengths", () => {
    runner.test("should generate password with custom length", () => {
      const password = randomPasswordGenerator(12);
      if (password.length !== 12)
        throw new Error("Expected password length to be 12");
    });

    runner.test("should handle minimum length", () => {
      const password = randomPasswordGenerator(1);
      if (password.length !== 1)
        throw new Error("Expected password length to be 1");
    });

    runner.test("should handle maximum length", () => {
      const password = randomPasswordGenerator(100);
      if (password.length !== 100)
        throw new Error("Expected password length to be 100");
    });
  });

  // Character set options
  runner.group("Character Set Options", () => {
    runner.test("should generate password with only alphabets", () => {
      const options = { numbers: false, special: false, alphabets: true };
      const password = randomPasswordGenerator(8, options);
      if (!checkPasswordComposition(password, options))
        throw new Error("Password composition check failed");
      if (/[0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password))
        throw new Error("Password contains invalid characters");
    });

    runner.test("should generate password with only numbers", () => {
      const options = { numbers: true, special: false, alphabets: false };
      const password = randomPasswordGenerator(8, options);
      if (!checkPasswordComposition(password, options))
        throw new Error("Password composition check failed");
      if (/[a-zA-Z!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password))
        throw new Error("Password contains invalid characters");
    });

    runner.test("should generate password with only special characters", () => {
      const options = { numbers: false, special: true, alphabets: false };
      const password = randomPasswordGenerator(8, options);
      if (!checkPasswordComposition(password, options))
        throw new Error("Password composition check failed");
      if (/[a-zA-Z0-9]/.test(password))
        throw new Error("Password contains invalid characters");
    });

    runner.test("should generate password with mixed character sets", () => {
      const options = { numbers: true, special: true, alphabets: true };
      const password = randomPasswordGenerator(20, options);
      if (!checkPasswordComposition(password, options))
        throw new Error("Password composition check failed");
    });
  });

  // Edge cases and error handling
  runner.group("Edge Cases and Error Handling", () => {
    runner.test("should handle zero length by returning empty string", () => {
      const password = randomPasswordGenerator(0);
      if (password !== "")
        throw new Error("Expected empty string for zero length");
    });

    runner.test(
      "should handle negative length by returning empty string",
      () => {
        const password = randomPasswordGenerator(-5);
        if (password !== "")
          throw new Error("Expected empty string for negative length");
      }
    );

    runner.test(
      "should default to alphabets when no character set is selected",
      () => {
        const options = { numbers: false, special: false, alphabets: false };
        const password = randomPasswordGenerator(8, options);
        if (!/^[a-zA-Z]+$/.test(password))
          throw new Error("Expected only alphabets in password");
      }
    );
  });
});

// Print test summary
runner.printSummary();
