
export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="TravelEase home">
        <span className="brand-icon">✈</span>
        <span>
          Travel<span className="brand-accent">Ease</span>
        </span>
      </a>

      <nav>
        <a href="#destinations">Destinations</a>
        <a href="#booking">Book a trip</a>
      </nav>
    </header>
  );
}
