import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { Link, useRevalidator } from "react-router-dom";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../firebaseContext/FirebaseContext";

type SavedInfo = {
  userID: string;
  carparkID: string;
};

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

const Dashboard = () => {
  const [saved, setSaved] = useState<SavedInfo[]>([]);
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);
  const savedCollectionRef = collection(db, "favourites");
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getSaved = async () => {
      const data = await getDocs(savedCollectionRef);
      console.log(data.docs);
      setSaved(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };

    getSaved();
  }, []);

  console.log(saved);

  const firestoreInfo = saved.map((info)=>{
    setCarparkID(info.carparkID)
    setUserID(info.userID)
  })

  //if its this userID, return that user's carparkID
  


  //create function to filter based on the saved carpark ID
  //ensure correct user + ensure correct carpark ID

  //based on the userID, generate all the carparkID


  const filtered = ltaCarparkAvail.map((lots) => {
    return carparkID.includes(lots.CarParkID) && 
    })
  };

  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      <h1>User Dashboard</h1>
      <h2>user info here</h2>
      <div>
        {saved.map((info) => {
          return (
            <div>
              <p>{info.userID}</p> <p>{info.carparkID}</p>{" "}
            </div>
          );
        })}
      </div>
      <Button>
        <Link to="/logout">Sign out</Link>
      </Button>
    </Container>
  );
};

export default Dashboard;
