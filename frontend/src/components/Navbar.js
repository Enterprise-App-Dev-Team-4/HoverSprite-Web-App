// Navbar.js

function returnNavBar(data, role) {
  console.log('hello navbar');
  return `
  <nav class="navbar navbar-expand-lg navbar-custom" id="navbar-container">
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
                  <a class="nav-link" href="/service?role=${encodeURIComponent(role)}">Services</a>
                  <a class="nav-link" href="${role === 'receptionist' ? '/receptionist-order' : '/order-list'}?role=${encodeURIComponent(role)}">Orders</a>
              </div>
              <div class="dropdown ms-auto">
                  <button class="btn profile-dropdown" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src=${data.profileImage} alt="Profile" class="rounded-circle" style="width: 40px;"> ${data.fullName}
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li><a class="dropdown-item" href="/profile"><i class="bi bi-person-circle me-2"></i>View Profile</a></li>
                      <li><a class="dropdown-item" href="/logout"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                  </ul>
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
      .profile-dropdown {
          background-color: transparent; /* Remove background */
          border: none; /* Remove border */
          padding: 0; /* Remove padding */
          color: black; /* Text color */
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
      }
      .profile-dropdown::after {
          display: none; /* Remove dropdown arrow */
      }
      .profile-badge img {
          border-radius: 50%;
          width: 40px;
      }
      .dropdown-menu {
          min-width: auto; /* Adjust dropdown width */
      }
  </style>
  `;
}




function activeClick() {
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
}

activeClick();
returnNavBar();