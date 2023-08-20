import "./AddService.css";
import Services from "../../components/Services/Services";

import { registerService } from "../../features/services/servicesSlice";
import { getSpecificSalonServices } from "../../features/services/servicesSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddService = () => {
  const { user } = useSelector((state) => state.user);
  const { services } = useSelector((state) => state.services);
  const { salons } = useSelector((state) => state.salons);

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    dispatch(getSpecificSalonServices(salons[0]._id));
  }, [dispatch]);

  const pushData = (e) => {
    e.preventDefault();
    const serviceDetails = {
      userID: user._id,
      salonID: "64b19d77f38e601b1633f29f",
      name: name,
      description: description,
      duration: duration,
      price: price,
    };
    dispatch(registerService(serviceDetails));
  };

  return (
    <>
      <div>
        <Services services={services} />
      </div>
      <form onSubmit={(e) => pushData(e)}>
        <ul>
          <li>
            <label>Name : </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Description : </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Duration : </label>
            <input
              type="text"
              onChange={(e) => setDuration(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Price : </label>
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Image : </label>
            <input type="file"></input>
          </li>
        </ul>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddService;
