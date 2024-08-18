// JavaScript to add 'active' class on click
function activeClick()
{
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function returnNavBar(user_name)
{
    console.log('hello navbar');
    return `<nav class="navbar navbar-expand-lg navbar-custom" id="navbar-container">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../../../public/HoverSpriteLogo.png" style="height:40px;" id="logo-img"> HoverSprite
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="#">Home</a>
        <a class="nav-link" href="/about-us">About</a>
        <a class="nav-link" href="/service">Services</a>
        <a class="nav-link" href="/booking">Booking</a>
        <a class="nav-link" href="#">Orders</a>
      </div>
      <div class="profile-badge ms-auto">
        <img src="../../../public/user-avatar.png">
        <span>${user_name}</span>
      </div>
    </div>
  </div>
</nav>

<style>
    .navbar-custom {
    background-color: #fff;
    color: black;
    border-bottom: 1px solid #ccc;
    }
    .navbar-brand, .nav-link {
        color: black;
        font-weight: bold;
    }
    .nav-link.active {
        color: green; /* Active link color */
        text-decoration: underline;
        text-decoration-color: green; /* Green underline */
        text-decoration-thickness: 2px; /* Thickness of the underline */
    }
    .profile-badge {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .profile-badge img {
        border-radius: 50%;
        width: 40px;
    }
    </style>
`;
}


activeClick();
returnNavBar(user_name);