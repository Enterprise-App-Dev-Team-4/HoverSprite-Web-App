function returnFooter()
{
    return `
    <footer class="footer mt-4">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <img src="../../../public/HoverSpriteLogo.png" alt="Company Logo" style="width: 50px;"> <!-- Replace 'new-logo-path.png' with your logo file path -->
            </div>
            <div class="col-md-2">
                <h5>Company</h5>
                <ul class="list-unstyled">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
            <div class="col-md-2">
                <h5>Spray Booking</h5>
                <ul class="list-unstyled">
                    <li><a href="#">Book Spray</a></li>
                    <li><a href="#">Manage Orders</a></li>
                    <li><a href="#">How It Works</a></li>
                </ul>
            </div>
            <div class="col-md-2">
                <h5>Contact Us</h5>
                <p>Customer Support: 123-456-7890</p>
                <p>Head Office: 123-456-7890</p>
            </div>
            <div class="col-md-3">
                <h5>Socials</h5>
                <div class="socials">
                    <a href="#"><i class="fa fa-facebook" style="width: 24px; font-size: 24px;"></i></a>
                    <a href="#"><i class="fa fa-twitter" style="width: 24px; font-size: 24px;"></i></a>
                    <a href="#"><i class="fa fa-instagram" style="width: 24px; font-size: 24px;"></i></a>
                    <a href="#"><i class="fa fa-linkedin" style="width: 24px; font-size: 24px;"></i></a>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                © 2024 HoverSprite | All Rights Reserved
            </div>
        </div>
    </footer>

        <style>
        .footer {
            background-color: #202020; /* Dark grey background */
            color: #f8f9fa; /* Light grey text color for readability */
            padding: 20px 0;
        }

        .footer a {
            color: #c7c7c7; /* Slightly lighter grey for links */
            text-decoration: none; /* Removes underline from links */
        }

        .footer a:hover {
            color: #ffffff; /* White color for links on hover for better visibility */
        }

        .footer h5 {
            color: #ffffff; /* Titles in white */
            margin-bottom: 10px; /* Adds a little space below the title */
        }

        .footer ul {
            padding: 0; /* Removes padding for a cleaner look */
            list-style-type: none; /* No bullets in lists */
        }

        .footer img {
            filter: brightness(0) invert(1); /* Inverts icons to white, adjust as needed */
            width: 24px; /* Standardizes social icon sizes */
            margin-right: 10px; /* Space between icons */
        }

        /* Footer copyright text alignment and color */
        .footer .row:last-child {
            color: #aaa; /* Light grey for less emphasis */
            text-align: center; /* Centers copyright text */
            margin-top: 20px; /* Adds space above the copyright text */
        }
        </style>
    `;
}

returnFooter();