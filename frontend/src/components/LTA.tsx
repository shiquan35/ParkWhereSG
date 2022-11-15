import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export interface IAppProps {}

export function LTA(props: IAppProps) {
  const url =
    "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

  const config = {
    headers: {
      AccountKey: "c8VpKJ+bQqWSBXH8LNd8yw==",
      Accept: "application/json",
    },
  };

  const options: { AccountKey: string; accept: string } = {
    AccountKey: "c8VpKJ+bQqWSBXH8LNd8yw==",
    accept: "application/json",
  };

  const [parkingsOne, setParkingsOne] = useState();
  const [parkingsTwo, setParkingsTwo] = useState();

  useEffect(() => {
    console.log("getting info");
    axios
      .get(url, config)
      .then((res) => {
        setParkingsOne(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: url,
  //     headers: options,
  //   })
  //     .then((res) => {
  //       setParkingsTwo(res.data);
  //     })
  //     .catch((err) => console.log("error occured:", err));
  // }, []);

  console.log(parkingsOne);
  console.log(parkingsTwo);
  return (
    <>
      <div>LTA page</div>
    </>
  );
}
