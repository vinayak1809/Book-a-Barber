import "./Hero.css";

const HeroContainer = () => {
  return (
    <div className="feature-multiple-9">
      <main className="section-title-parent" id="mainSection">
        <div className="section-title">
          Get served right, at Home
        </div>
        <div className="content">
          <div className="phone-mockup">
            <img className="rectangle-icon" alt="" src="/rectangle@2x.png" />
          </div>
          <div className="features-list">
            <div className="div">
              <img
                className="feature-icon-with-circle"
                alt=""
                src="/feature-icon-with-circle.svg"
              />
              <div className="details">
                <div className="headline">Select Service</div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  eu dolor, neque, sollicitudin proin.
                </div>
              </div>
            </div>
            <div className="div">
              <img
                className="feature-icon-with-circle"
                alt=""
                src="/feature-icon-with-circle1.svg"
              />
              <div className="details">
                <div className="headline">Book an Appointment</div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Interdum porta magna at blandit a.
                </div>
              </div>
            </div>
            <div className="div">
              <img
                className="feature-icon-with-circle"
                alt=""
                src="/feature-icon-with-circle2.svg"
              />
              <div className="details">
                <div className="headline">Manage Appointments</div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  morbi a, mi egestas eu amet mauris adipiscing.
                </div>
              </div>
            </div>
            <div className="div">
              <img
                className="feature-icon-with-circle"
                alt=""
                src="/feature-icon-with-circle3.svg"
              />
              <div className="details">
                <div className="headline">Reduce Conflict</div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  gravida blandit volutpat sagittis sed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroContainer;
