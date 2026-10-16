
export default function BookingConfirmation({
  booking,
  destination,
  onNewBooking
}) {
  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  return (
    <section className="confirmation" aria-live="polite">
      <div className="success-icon">✓</div>

      <p className="eyebrow">BOOKING REQUEST CONFIRMED</p>

      <h2>
        You're ready to explore, {booking.fullName.split(" ")[0]}!
      </h2>

      <p className="confirmation-intro">
        Your demo booking request has been submitted successfully.
        Here is your trip summary.
      </p>

      <div className="confirmation-destination">
        <span className="confirmation-emoji">
          {destination.emoji}
        </span>

        <div>
          <span className="destination-region">
            YOUR DESTINATION
          </span>
          <h3>{destination.name}</h3>
          <p>{destination.region}</p>
        </div>
      </div>

      <div className="summary-grid">
        <div>
          <span>Traveler</span>
          <strong>{booking.fullName}</strong>
        </div>

        <div>
          <span>Travelers</span>
          <strong>{booking.travelers}</strong>
        </div>

        <div>
          <span>Departure</span>
          <strong>{formatDate(booking.departure)}</strong>
        </div>

        <div>
          <span>Return</span>
          <strong>{formatDate(booking.returnDate)}</strong>
        </div>

        <div className="summary-total">
          <span>Estimated total</span>
          <strong>
            ₹{booking.total.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <p className="confirmation-email">
        A real booking system would send trip details to{" "}
        <strong>{booking.email}</strong>.
      </p>

      <button
        className="button button-primary"
        type="button"
        onClick={onNewBooking}
      >
        Plan another trip
      </button>
    </section>
  );
}
