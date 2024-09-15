package rmit.hoversprite.Utils;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

@Service
public class PasswordGenerator {

    // Define the characters that can be used in the password
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_+=<>?";

    // Combine all characters into one string
    private static final String ALL_CHARACTERS = LOWERCASE + UPPERCASE + DIGITS + SPECIAL_CHARACTERS;

    // SecureRandom provides cryptographically strong random numbers
    private static final SecureRandom random = new SecureRandom();

    public String generateRandomPassword() {
        // Define the password length
        int passwordLength = 12;

        // StringBuilder to hold the password characters
        StringBuilder password = new StringBuilder(passwordLength);

        // Ensure the password contains at least one character from each category
        password.append(LOWERCASE.charAt(random.nextInt(LOWERCASE.length())));
        password.append(UPPERCASE.charAt(random.nextInt(UPPERCASE.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));

        // Fill the remaining characters of the password with random selections from all characters
        for (int i = 4; i < passwordLength; i++) {
            password.append(ALL_CHARACTERS.charAt(random.nextInt(ALL_CHARACTERS.length())));
        }

        // Shuffle the characters for better randomness
        return shuffleString(password.toString());
    }

    // Helper method to shuffle the characters in the password for better randomness
    private String shuffleString(String input) {
        StringBuilder result = new StringBuilder(input.length());
        char[] characters = input.toCharArray();
        for (int i = characters.length; i > 0; i--) {
            int randomIndex = random.nextInt(i);
            result.append(characters[randomIndex]);
            characters[randomIndex] = characters[i - 1];
        }
        return result.toString();
    }

    public static void main(String[] args) {
        PasswordGenerator generator = new PasswordGenerator();
        System.out.println("Generated Password: " + generator.generateRandomPassword());
    }
}