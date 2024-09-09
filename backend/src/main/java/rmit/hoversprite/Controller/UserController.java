package rmit.hoversprite.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Services.UserService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Enum.Role;
import rmit.hoversprite.Utils.Enum.SprayerExpertise;
import rmit.hoversprite.Utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

        @Autowired
    private SprayerFeatureServices sprayServices;

    @Autowired
    private JwtUtil jwtUtil;

    private ResponseEntity<?> handleFarmerLoginRequest(User user, HttpServletResponse response) {
        Farmer farmer = new Farmer();
        farmer.setUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(farmer.getEmail());
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(farmer, token));
            
            // Set token in a cookie
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false) // Set to true in production (HTTPS)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)  // Token valid for 7 days
                    .sameSite("Lax")  // Prevent CSRF
                    .build();

            response.addHeader("Set-Cookie", jwtCookie.toString());

            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Incorrect email, phone number, or password.");
        }
    }

    private ResponseEntity<?> handleReceptionistLoginRequest(User user, HttpServletResponse response) {
        Receptionist receptionist = new Receptionist();
        receptionist.setUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(receptionist.getEmail());
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(receptionist, token));

            // Set token in a cookie
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false) // Set to true in production (HTTPS)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)  // Token valid for 7 days
                    .sameSite("Lax")  // Prevent CSRF
                    .build();

            response.addHeader("Set-Cookie", jwtCookie.toString());

            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Incorrect email, phone number, or password.");
        }
    }

    private ResponseEntity<?> handleSprayerLoginRequest(User user, HttpServletResponse response) {
        Sprayer sprayer = new Sprayer();
        sprayer.setUser(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        
        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(sprayer.getEmail());
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(sprayer, token));

            // Set token in a cookie
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false) // Set to true in production (HTTPS)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)  // Token valid for 7 days
                    .sameSite("Lax")  // Prevent CSRF
                    .build();

            response.addHeader("Set-Cookie", jwtCookie.toString());
            
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Incorrect email, phone number, or password.");
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> returnUserData(@RequestBody User user, @RequestParam String type, HttpServletResponse response) {
        if ("farmer".equals(type)) {
            return handleFarmerLoginRequest(user, response);
        }
        if ("receptionist".equals(type)) {
            return handleReceptionistLoginRequest(user, response);
        }

        if ("sprayer".equals(type)) {
            return handleSprayerLoginRequest(user, response);
        }

        return ResponseEntity.badRequest().body("Invalid type parameter");
    }

    @PostMapping("register")
    public ResponseEntity<?> saveUserToDatabase(@RequestBody User user, @RequestParam String type) {
        if (type.equals("farmer")) {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            farmer.setRole(Role.Farmer);
            UserDTO farmerDTO = new DTOConverter().convertUserDataToObject(userService.register(farmer));
            return ResponseEntity.ok(farmerDTO);
        } else if (type.equals("receptionist")) {
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            receptionist.setRole(Role.Receptionist);
            UserDTO receptionistDTO = new DTOConverter().convertUserDataToObject(userService.register(receptionist));
            return ResponseEntity.ok(receptionistDTO);
        }
        return ResponseEntity.badRequest().body("This user has been registered before");
    }

    @PostMapping("register/sprayer")
    public ResponseEntity<?> createSprayer(@RequestBody Sprayer user) throws Exception
    {
        
        Sprayer sprayer = new Sprayer();
        sprayer.setUser(user);
        sprayer.setRole(Role.Sprayer);
        sprayer.setSprayerExpertise(user.getSprayerExpertise());
        UserDTO sprayerDTO = new DTOConverter().convertUserDataToObject(userService.register(sprayer));
        return ResponseEntity.ok(sprayerDTO);
    }

    @PostMapping("log-out")
    public ResponseEntity<?> userLogOut(@RequestBody User user, @RequestParam String type, HttpServletResponse response) {
        User logoutUser = null;
        System.out.println("Receptionist here");
        if ("farmer".equals(type)) {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            logoutUser = userService.logout(farmer);
        }
        if ("receptionist".equals(type)) {
            
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            logoutUser = userService.logout(receptionist);
        }
        if ("sprayer".equals(type)) {
            Sprayer sprayer = new Sprayer();
            sprayer.setUser(user);
            logoutUser = userService.logout(sprayer);
        }


        if(logoutUser != null)
        {
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(logoutUser);
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", null)
            .httpOnly(true)
            .secure(false) // Set to true in production (HTTPS)
            .path("/")
            .maxAge(0)  // Immediately expire the cookie
            .sameSite("Lax")
            .build();

        // Add the expired cookie to the response to remove it from the browser
            response.addHeader("Set-Cookie", jwtCookie.toString());
            return ResponseEntity.ok(userDTO);
        }
        
        return null;
    }
}
