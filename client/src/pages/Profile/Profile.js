import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

import {
  registerSalonSchedules,
  updateSalonSchedules,
} from "../../features/services/servicesSlice";
import { getAllSalonSchedules } from "../../features/Salons/salonsSlice";

const Profile = () => {
  const tomorrow = dayjs().add(7, "day");

  const { currentSalon, schedules } = useSelector((state) => state.salons);

  const [date, setDate] = useState({ $d: "" });
  const [times, setTimes] = useState([]);
  const [checkExistingDate, setCheckExistingDate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSalonSchedules(currentSalon[0]._id));
  }, []);

  //trying to retrive the particular date record when we clicked on particular date
  useEffect(() => {
    const n = schedules[0].dayTime.filter((dateTime) => {
      return new Date(dateTime.date).toString() == date.$d.toString();
    });

    if (Object.keys(n).length > 0) {
      setCheckExistingDate(true);
      setTimes(n[0].time);
    } else {
      setCheckExistingDate(false);
      setTimes([]);
    }
  }, [date]);

  const addTime = (currentTime) => {
    var check = true;

    if (times.length < 1) {
      setTimes([{ time: currentTime, isBooked: false }]);
    } else {
      times.map((time) => {
        if (time.time === currentTime) {
          return (check = false);
        }
      });
    }

    if (check) {
      setTimes([...times, { time: currentTime.toString(), isBooked: false }]);
    }

    //alternate code on above 3-4 line
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
      date: date.$d.toString(),
      times: times,
      barberId: currentSalon[0]._id,
    };

    checkExistingDate
      ? dispatch(updateSalonSchedules(schedule))
      : dispatch(registerSalonSchedules(schedule));
  };

  const timeFormat = (time) => {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let h = addZero(new Date(time.time).getHours());
    let m = addZero(new Date(time.time).getMinutes());
    return h + " : " + m;
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
