
export default function BookingForm({
  form,
  errors,
  destinations,
  total,
  onChange,
  onSubmit
}) {
  return (
    <form
      className="booking-form"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="section-heading">
        <span className="step-number">02</span>
        <div>
          <h2>Your trip details</h2>
          <p>Fill in your details to plan your getaway.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="e.g. Aditi Sharma"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && (
            <small className="error">{errors.fullName}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <small className="error">{errors.email}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={onChange}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <small className="error">{errors.phone}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="destination">Destination</label>
          <select
            id="destination"
            name="destination"
            value={form.destination}
            onChange={onChange}
            aria-invalid={Boolean(errors.destination)}
          >
            <option value="">Select a destination</option>
            {destinations.map((destination) => (
              <option
                key={destination.id}
                value={destination.id}
              >
                {destination.name} — ₹
                {destination.price.toLocaleString("en-IN")}/person
              </option>
            ))}
          </select>
          {errors.destination && (
            <small className="error">{errors.destination}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="departure">Departure date</label>
          <input
            id="departure"
            name="departure"
            type="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={form.departure}
            onChange={onChange}
            aria-invalid={Boolean(errors.departure)}
          />
          {errors.departure && (
            <small className="error">{errors.departure}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="returnDate">Return date</label>
          <input
            id="returnDate"
            name="returnDate"
            type="date"
            min={form.departure || new Date().toLocaleDateString("en-CA")}
            value={form.returnDate}
            onChange={onChange}
            aria-invalid={Boolean(errors.returnDate)}
          />
          {errors.returnDate && (
            <small className="error">{errors.returnDate}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="travelers">Number of travelers</label>
          <select
            id="travelers"
            name="travelers"
            value={form.travelers}
            onChange={onChange}
            aria-invalid={Boolean(errors.travelers)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "traveler" : "travelers"}
              </option>
            ))}
          </select>
          {errors.travelers && (
            <small className="error">{errors.travelers}</small>
          )}
        </div>
      </div>

      <div className="estimate">
        <div>
          <span className="estimate-label">
            Estimated package total
          </span>
          <span className="estimate-note">
            Based on selected destination and travelers
          </span>
        </div>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>

      <button
        className="button button-primary submit-button"
        type="submit"
      >
        Confirm booking <span>→</span>
      </button>

      <p className="form-note">
        Demo project only. No payment will be collected.
      </p>
    </form>
  );
}
