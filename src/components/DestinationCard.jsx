
export default function DestinationCard({
  destination,
  selected,
  onSelect
}) {
  return (
    <article
      className={`destination-card ${selected ? "selected" : ""}`}
    >
      <div className={`destination-art ${destination.color}`}>
        <span className="destination-emoji">
          {destination.emoji}
        </span>

        {selected && (
          <span className="selected-tag">Selected</span>
        )}
      </div>

      <div className="destination-content">
        <p className="destination-region">
          {destination.region}
        </p>

        <h3>{destination.name}</h3>

        <p className="destination-description">
          {destination.description}
        </p>

        <div className="destination-bottom">
          <p className="price">
            ₹{destination.price.toLocaleString("en-IN")}
            <span> / person</span>
          </p>

          <button
            className={
              selected
                ? "button button-selected"
                : "button button-outline"
            }
            type="button"
            onClick={() => onSelect(destination.id)}
          >
            {selected ? "Selected ✓" : "Choose"}
          </button>
        </div>
      </div>
    </article>
  );
}
