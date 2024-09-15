package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.UserService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.JwtUtil;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Allow requests from this origin
public class OAuth2Controller {

    @Autowired
    JwtUtil util;

    @Autowired
    FarmerService farmerService;

    @Autowired
    UserService userService;

    @PostMapping("api/oauth/config")
    public ResponseEntity<UserDTO> checkFarmerOAuth(@RequestParam String email, HttpServletResponse response) {
        // Retrieve the farmer by email
        Farmer farmer = farmerService.getFarmerByEmail(email);

        // Generate the JWT token
        String token = util.generateToken(farmer.getEmail());

        farmer.setToken(token);
        // Convert farmer data to UserDTO and include the token
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(farmer);

        System.out.println("Token: " + userDTO.getToken());

        // Create a cookie to store the JWT token
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)  // Set to true in production (for HTTPS)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)  // Token valid for 7 days
                .sameSite("Lax")  // Prevent CSRF
                .build();

        // Add the cookie to the response header
        response.addHeader("Set-Cookie", jwtCookie.toString());

        // Return the UserDTO object to the client as the response body
        return ResponseEntity.ok(userDTO);
    }
}

