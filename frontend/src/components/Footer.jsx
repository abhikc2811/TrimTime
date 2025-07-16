const Footer = () => {
    return (
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>We offer top-notch barber services at your convenience. Book appointments with ease and trust the experts.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Terms of Service</a></li>
                <li><a href="#" className="text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Facebook</a></li>
                <li><a href="#" className="text-white">Instagram</a></li>
                <li><a href="#" className="text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  