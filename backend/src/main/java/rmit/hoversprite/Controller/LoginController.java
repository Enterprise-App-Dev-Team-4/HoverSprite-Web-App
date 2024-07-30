package rmit.hoversprite.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/")
public class LoginController {
    
    // @ResponseBody
    @GetMapping("landingpage")
    public String returnHello()
    {
        return "<h2>Hello WOrld</h2>";
    }

    // @GetMapping("/login")
    // public String getSignupPage() {
    //     return "redirect:/Signup.html";
    // }
}