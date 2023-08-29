import "./RegisterSalon.css";
import { registerSalon } from "../../features/Salons/salonsSlice";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageUpload } from "../../utils/imageUpload";

const RegisterSalon = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [bio, setBio] = useState();

  const { user } = useSelector((state) => state.user);

  const handleMedia = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const pushData = async (e) => {
    e.preventDefault();
    const img = await imageUpload(image);

    const salonDetails = {
      userId: user.user_id,
      name: name,
      contactInformation: contact,
      location: city,
      bio: bio,
      image: img,
      address: address,
    };
    dispatch(registerSalon(salonDetails));
  };
  return (
    <>
      <form className="registration-salon-form" onSubmit={(e) => pushData(e)}>
        <div className="input-section">
          <div className="left-side-">
            <ul>
              <li>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label>Contact:</label>
                <input onChange={(e) => setContact(e.target.value)}></input>
              </li>
              <li>
                <label>City</label>
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </li>
              <li>
                <label>Cover Picture:</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleMedia}
                  accept="image/*,video/*"
                />
              </li>
            </ul>
          </div>
          <div className="right-side">
            <ul>
              <li>
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </li>
              <li>
                <label>Bio</label>
                <input onChange={(e) => setBio(e.target.value)}></input>
              </li>
            </ul>
          </div>
        </div>
        <div className="buttons">
          <button className="reg-btn" type="submit">
            Save
          </button>
          <button className="reg-btn" type="submit">
            Publish
          </button>
        </div>
      </form>
      <div className="add-service">
        <a href="/some">
          <Link to="/Services">
            Add Services <span> -- </span>
          </Link>
        </a>
      </div>
    </>
  );
};

export default RegisterSalon;
