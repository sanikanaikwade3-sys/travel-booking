
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import DestinationCard from "./components/DestinationCard.jsx";
import BookingForm from "./components/BookingForm.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";
import { destinations } from "./data.js";
import "./App.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  destination: "",
  departure: "",
  returnDate: "",
  travelers: "1"
};

function validateForm(form) {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!form.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Name must contain at least 2 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = form.phone.replace(/\D/g, "");

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{10}$/.test(digits)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!form.destination) {
    errors.destination = "Please select a destination.";
  }

  if (!form.departure) {
    errors.departure = "Please choose a departure date.";
  } else {
    const departureDate = new Date(
      `${form.departure}T00:00:00`
    );

    if (
      Number.isNaN(departureDate.getTime()) ||
      departureDate < today
    ) {
      errors.departure = "Departure date cannot be in the past.";
    }
  }

  if (!form.returnDate) {
    errors.returnDate = "Please choose a return date.";
  } else if (
    form.departure &&
    form.returnDate <= form.departure
  ) {
    errors.returnDate =
      "Return date must be after departure date.";
  }

  const travelers = Number(form.travelers);

  if (
    !Number.isInteger(travelers) ||
    travelers < 1 ||
    travelers > 10
  ) {
    errors.travelers = "Choose between 1 and 10 travelers.";
  }

  return errors;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);

  const selectedDestination = destinations.find(
    (item) => item.id === form.destination
  );

  const total = useMemo(() => {
    if (!selectedDestination) return 0;

    return (
      selectedDestination.price *
      Number(form.travelers || 1)
    );
  }, [selectedDestination, form.travelers]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "departure" &&
      current.returnDate &&
      value >= current.returnDate
        ? { returnDate: "" }
        : {})
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[name];

      if (name === "departure" || name === "returnDate") {
        delete next.returnDate;
      }

      return next;
    });

    setBooking(null);
  }

  function chooseDestination(destinationId) {
    setForm((current) => ({
      ...current,
      destination: destinationId
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next.destination;
      return next;
    });

    setBooking(null);

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setBooking(null);

      const firstInvalid = document.querySelector(
        '[aria-invalid="true"]'
      );

      firstInvalid?.focus();
      return;
    }

    setBooking({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.replace(/\D/g, ""),
      travelers: Number(form.travelers),
      total
    });
  }

  function startNewBooking() {
    setForm({ ...initialForm });
    setErrors({});
    setBooking(null);

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  return (
    <div id="home">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR NEXT ADVENTURE STARTS HERE
            </span>

            <h1>
              Make room for
              <br />
              <span>new memories.</span>
            </h1>

            <p>
              Discover beautiful places, plan your next getaway,
              and make every journey count.
            </p>

            <a
              className="button button-primary hero-button"
              href="#destinations"
            >
              Explore destinations <span>↓</span>
            </a>

            <div className="hero-note">
              <span className="mini-avatar">✦</span>
              <span>
                <strong>Simple planning.</strong> Memorable journeys.
              </span>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Illustration of a mountain travel destination"
          >
            <div className="sun" />
            <div className="mountain mountain-back" />
            <div className="mountain mountain-front" />
            <div className="lake" />

            <div className="floating-card">
              <span>✈</span>
              <div>
                <strong>Your next trip</strong>
                <small>Just a few clicks away</small>
              </div>
            </div>

            <div className="visual-caption">
              FIND YOUR HAPPY PLACE <span>✦</span>
            </div>
          </div>
        </section>

        <section
          className="content-section destinations-section"
          id="destinations"
        >
          <div className="section-heading">
            <span className="step-number">01</span>
            <div>
              <h2>Choose your destination</h2>
              <p>
                A few places to inspire your next adventure.
              </p>
            </div>
          </div>

          <div className="destination-grid">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                selected={form.destination === destination.id}
                onSelect={chooseDestination}
              />
            ))}
          </div>
        </section>

        <section
          className="content-section booking-section"
          id="booking"
        >
          {booking && selectedDestination ? (
            <BookingConfirmation
              booking={booking}
              destination={selectedDestination}
              onNewBooking={startNewBooking}
            />
          ) : (
            <BookingForm
              form={form}
              errors={errors}
              destinations={destinations}
              total={total}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">✈</span>
          <span>
            Travel<span className="brand-accent">Ease</span>
          </span>
        </a>

        <p>
          Made for your next great story. <span>✦</span>
        </p>

        <small>
          ReactJS practical project · Demo bookings only
        </small>
      </footer>
    </div>
  );
}
