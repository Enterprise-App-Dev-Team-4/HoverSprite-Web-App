package rmit.hoversprite.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("")
public class StripeController {

    @PostMapping("simulate-visa-payment")
    public ResponseEntity<Map<String, Object>> simulateVisaPayment(@RequestBody Map<String, Object> paymentData) {
        String cardNumber = (String) paymentData.get("cardNumber");
        String expiryDate = (String) paymentData.get("expiryDate");
        String cvv = (String) paymentData.get("cvv");
        Integer amount = (Integer) paymentData.get("amount");

        Map<String, Object> response = new HashMap<>();
        System.out.println(cardNumber);

        // Validate card number using Luhn's Algorithm
        if (!isValidCardNumber(cardNumber)) {
            response.put("success", false);
            response.put("message", "Invalid card number format.");
            return ResponseEntity.ok(response);
        }

        // Validate expiry date
        if (!isValidExpiryDate(expiryDate)) {
            response.put("success", false);
            response.put("message", "Card is expired or invalid expiry date.");
            return ResponseEntity.ok(response);
        }

        // Validate CVV (basic check for 3 or 4 digits)
        if (!isValidCVV(cvv)) {
            response.put("success", false);
            response.put("message", "Invalid CVV.");
            return ResponseEntity.ok(response);
        }

        // Simulate successful payment if all validations pass
        response.put("success", true);
        response.put("message", "Payment successful.");
        response.put("amount", amount);
        return ResponseEntity.ok(response);
    }

    // Validate card number using Luhn's Algorithm
    private boolean isValidCardNumber(String cardNumber) {
        int sum = 0;
        boolean shouldDouble = false;

        // Start from the last digit and move backwards
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(cardNumber.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        // Valid card number passes the Luhn check (sum modulo 10 equals 0)
        return sum % 10 == 0;
    }

    // Validate expiry date in MM/YY format and check if it's expired
    private boolean isValidExpiryDate(String expiryDate) {
        Pattern pattern = Pattern.compile("^(0[1-9]|1[0-2])/(\\d{2})$");
        Matcher matcher = pattern.matcher(expiryDate);

        if (!matcher.matches()) {
            return false; // Invalid format
        }

        int expMonth = Integer.parseInt(matcher.group(1));
        int expYear = Integer.parseInt(matcher.group(2));

        // Get current year and month
        Calendar calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR) % 100; // Last two digits of the year
        int currentMonth = calendar.get(Calendar.MONTH) + 1; // Month is 0-indexed

        // Check if the card is expired
        if (expYear < currentYear || (expYear == currentYear && expMonth < currentMonth)) {
            return false; // Card is expired
        }

        return true;
    }

    // Validate CVV (3 or 4 digits)
    private boolean isValidCVV(String cvv) {
        return cvv.matches("^\\d{3,4}$");
    }
}
