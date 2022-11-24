import { useEffect, useState } from "react";
import axios from "axios";
import { IndivLTA } from "./IndivLTA";

const Avail = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(ltaCarparkAvail);
  const lotAvailability = ltaCarparkAvail.map((lots, i) => {
    return <IndivLTA lots={lots} key={i + 1} />;
  });

  return <div>{lotAvailability}</div>;
};

export default Avail;
