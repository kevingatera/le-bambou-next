import React from "react";

export const RoomAmenitiesSection = () => {
  return (
    <div className="room-amenities wf-section">
      <div className="description-container w-container">
        <div className="amenities-900-width amenitites-margin-bottom-104px">
          <h2 id="Amenities" className="p-2">Amenities</h2>
        </div>
        <div className="w-layout-grid amenities-three-column-grid">
          <div className="div-block">
            <h5>High-Speed Internet Access:</h5>
            <p className="stay-description-paragraph amenities-paragraphs">
              Stay connected with our free Wi-Fi service, perfect for business
              travelers or those who just want to keep in touch.
            </p>
          </div>
          <div className="div-block">
            <h5>En-Suite Spa-Style Bathroom:</h5>
            <p className="stay-description-paragraph">
              Enjoy our modern bathrooms equipped with a luxurious shower,
              providing a spa-like experience right in your room.
            </p>
          </div>
          <div className="div-block">
            <h5>Climate-Controlled Comfort:</h5>
            <p className="stay-description-paragraph">
              Experience year-round comfort with our air conditioning and an
              optional cozy fireplace for those chillier evenings.
            </p>
          </div>
          <div className="div-block">
            <h5>Work & Relaxation Space:</h5>
            <p className="stay-description-paragraph">
              Our rooms feature a functional work and reading desk alongside a
              high-quality TV for entertainment, ensuring a perfect balance
              between work and relaxation.
            </p>
          </div>
          <div className="div-block">
            <h5>
              In Room<br />Refreshments:
            </h5>
            <p className="stay-description-paragraph">
              Complimentary coffee and tea facilities are at your disposal,
              making your morning routine or late-night cravings convenient and
              enjoyable.
            </p>
          </div>
          <div className="div-block">
            <h5>Supreme Sleep Experience:</h5>
            <p className="stay-description-paragraph">
              Rest easy in our non-smoking rooms, featuring premium bedding and
              high-grade mattresses, refreshed daily by our dedicated
              housekeeping team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
