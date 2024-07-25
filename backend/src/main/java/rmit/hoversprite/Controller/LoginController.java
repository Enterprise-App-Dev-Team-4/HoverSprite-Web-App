package rmit.hoversprite.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
    @RequestMapping ("/login")
    @ResponseBody

    public String returnHello()
    {
        return "<h2>Hello WOrld</h2>";
    }
}