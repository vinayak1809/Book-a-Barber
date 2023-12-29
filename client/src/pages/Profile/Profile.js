import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { registerSalonSchedules } from "../../features/services/servicesSlice";

const Profile = () => {
  const [date, setDate] = useState({ $d: "something" });
  const [times, setTimes] = useState([]);
  const dispatch = useDispatch();

  const { currentSalon } = useSelector((state) => state.salons);

  const tomorrow = dayjs().add(7, "day");

  const addTime = (currentTime) => {
    const formattedTime = dayjs(currentTime).format("HH:mm A");
    if (!times.includes(formattedTime)) {
      setTimes([...times, formattedTime]);
    }
  };

  const remove = (removetime) => {
    const newTimes = times.filter((time) => {
      return time !== removetime;
    });
    setTimes(newTimes);
  };

  const update = () => {
    const formattedDate = dayjs(date).format("DD-MM-YY");

    const schedule = {
      date: formattedDate,
      times: times,
      barberId: currentSalon[0]._id,
    };
    dispatch(registerSalonSchedules(schedule));
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date: "
          date={date}
          onAccept={(newValue) => {
            setDate(newValue);
          }}
          maxDate={tomorrow}
          disablePast
          renderInput={(params) => <TextField {...params} />}
        />

        <TimePicker
          label="Select Time:"
          onAccept={(newValue) => {
            addTime(newValue);
          }}
          ampm={false}
          minutesStep={15}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div>
        <ul>
          {times.map((time, index) => (
            <li key={index}>
              <p>{time}</p>
              <button onClick={() => remove(time)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          update();
        }}
      >
        Update Schedule
      </button>
    </>
  );
};

export default Profile;
