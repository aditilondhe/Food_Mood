import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-4 text-base-content p-10 text-gray-700">
        <aside>
          <img src="/foodmood.png" width={100} />
          <p className="my-5 md:w-40">
            Savor the artistry where
            <br />
            every dish is a culinary
            <br />
            masterpiece
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Useful links</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">foodmood@gmail.com</a>
          <a className="link link-hover">+91 958 958 958</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
