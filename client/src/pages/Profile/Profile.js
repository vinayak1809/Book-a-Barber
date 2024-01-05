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
  const [date, setDate] = useState();
  const [times, setTimes] = useState([]);
  const dispatch = useDispatch();

  const { currentSalon } = useSelector((state) => state.salons);

  const tomorrow = dayjs().add(7, "day");

  const addTime = (currentTime) => {
    var check = true;

    if (times.length < 1) {
      setTimes([currentTime]);
    } else {
      times.map((time) => {
        if (time.toString() === currentTime.toString()) {
          return (check = false);
        }
      });
    }

    if (check) {
      setTimes([...times, currentTime]);
    }

    // if (!times.includes(currentTime)) {
    //   setTimes([...times, currentTime]);
    // }
  };

  const remove = (removetime) => {
    const newTimes = times.filter((time) => {
      return time !== removetime;
    });
    setTimes(newTimes);
  };

  const update = () => {
    const schedule = {
      date: date.$d,
      times: times,
      barberId: currentSalon[0]._id,
    };
    dispatch(registerSalonSchedules(schedule));
  };

  const timeFormat = (time) => {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let h = addZero(time.getHours());
    let m = addZero(time.getMinutes());
    return h + ":" + m;
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
            const customDate = new Date(newValue.$d);
            customDate.setFullYear(
              dayjs(date).year(),
              dayjs(date).month(),
              dayjs(date).date()
            );

            addTime(customDate);
          }}
          ampm={false}
          minutesStep={15}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div>
        {
          <ul>
            {times.map((time, index) => (
              <li key={index}>
                <p>{timeFormat(time)}</p>
                <button onClick={() => remove(time)}>X</button>
              </li>
            ))}
          </ul>
        }
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
