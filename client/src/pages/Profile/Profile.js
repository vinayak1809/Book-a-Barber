import { useSelector } from "react-redux";
import CreateSchedules from "../../components/Create-Schedules/CreateSchedules";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSalon } from "../../features/Salons/salonsSlice";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { currentSalon } = useSelector((state) => state.salons);

  const [name, setName] = useState(user.fullname);
  const [salonName, setSalonName] = useState(currentSalon[0].name);
  const [about, setAbout] = useState(currentSalon[0].about);
  const [time, setTime] = useState(currentSalon[0].time);
  const [address, setAddress] = useState(currentSalon[0].address);
  const [location, setLocation] = useState(currentSalon[0].location);
  const [schedules, setSchedules] = useState(currentSalon[0].Schedules);

  const [changeName, setChangeName] = useState(false);
  const [changeSalonDetails, setchangeSalonDetails] = useState(false);

  const pushData = async (e) => {
    e.preventDefault();
    const userDetails = {
      fullname: name,
    };

    changeName
      ? await dispatch(updateUser(userDetails))
      : await dispatch(updateUser(userDetails));
    await dispatch(updateSalon(userSalonDetails));

    const userSalonDetails = {
      name: salonName,
      about: about,
      time: time,
      address: address,
      location: location,
      Schedules: schedules,
    };
  };

  return (
    <>
      <div className="form">
        <form action="" onSubmit={(e) => pushData(e)}>
          <div className="textarea">
            <ul>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setChangeName(true);
                  setName(e.target.value);
                }}
              ></input>
              {user.role == "barber" && (
                <>
                  <input
                    type="text"
                    name="salon-name"
                    id="salon-name"
                    value={salonName}
                    required
                    onChange={(e) => setSalonName(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="about"
                    id="about"
                    value={about}
                    required
                    onChange={(e) => setAbout(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="time"
                    id="time"
                    value={time}
                    required
                    onChange={(e) => setTime(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="schedule-days"
                    id="schedule-days"
                    value={schedules}
                    required
                    onChange={(e) => setSchedules(e.target.value)}
                  ></input>
                </>
              )}
            </ul>
          </div>

          <button className="update-btn" type="submit">
            Update
          </button>
        </form>
      </div>
      <CreateSchedules />
    </>
  );
};

export default Profile;
