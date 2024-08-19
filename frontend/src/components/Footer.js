function returnFooter() {
    return `
    <footer class="footer mt-4">
        <div class="container">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <img src="../../../public/HoverSpriteLogo.png" alt="HoverSprite Logo" class="footer-logo">
                    <p class="mt-3">Revolutionizing farming services with cutting-edge technology and exceptional customer care.</p>
                </div>
                <div class="col-md-2 mb-4">
                    <h5>Company</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" aria-label="About Us">About Us</a></li>
                        <li><a href="#" aria-label="Services">Services</a></li>
                        <li><a href="#" aria-label="Privacy Policy">Privacy Policy</a></li>
                        <li><a href="#" aria-label="Terms of Service">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-md-2 mb-4">
                    <h5>Spray Booking</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" aria-label="Book Spray">Book Spray</a></li>
                        <li><a href="#" aria-label="Manage Orders">Manage Orders</a></li>
                        <li><a href="#" aria-label="How It Works">How It Works</a></li>
                    </ul>
                </div>
                <div class="col-md-2 mb-4">
                    <h5>Contact Us</h5>
                    <ul class="list-unstyled">
                        <li><a href="tel:+11234567890" aria-label="Call Customer Support">Customer Support: 123-456-7890</a></li>
                        <li><a href="tel:+11234567890" aria-label="Call Head Office">Head Office: 123-456-7890</a></li>
                        <li><a href="mailto:info@hoversprite.com" aria-label="Email Us">info@hoversprite.com</a></li>
                    </ul>
                </div>
                <div class="col-md-3 mb-4">
                    <h5>Connect With Us</h5>
                    <div class="socials">
                        <a href="#" aria-label="Facebook"><i class="fa fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fa fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fa fa-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a>
                    </div>
                    <div class="mt-3">
                        <h6>Subscribe to Our Newsletter</h6>
                        <form class="form-inline">
                            <div class="input-group">
                                <input type="email" class="form-control" placeholder="Enter your email" aria-label="Enter your email">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit" aria-label="Subscribe">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr class="mt-4 mb-3">
            <div class="row">
                <div class="col-md-12 text-center">
                    <p>&copy; 2024 HoverSprite | All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>

    <style>
    .footer {
        background-color: #202020;
        color: #f8f9fa;
        padding: 40px 0 20px;
        font-size: 14px;
    }

    .footer-logo {
        height:70px;
    }

    .footer h5 {
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .footer ul {
        padding: 0;
        list-style-type: none;
    }

    .footer a {
        color: #c7c7c7;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer a:hover {
        color: #ffffff;
    }

    .footer .socials a {
        display: inline-block;
        margin-right: 15px;
        font-size: 20px;
    }

    .footer .form-control {
        background-color: #333;
        border: none;
        color: #fff;
    }

    .footer .btn-primary {
        background-color: #007bff;
        border: none;
    }

    .footer hr {
        border-top: 1px solid #444;
    }

    @media (max-width: 767px) {
        .footer .col-md-2,
        .footer .col-md-3 {
            margin-bottom: 30px;
        }
    }
    </style>
    `;
}

returnFooter();