import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../firebaseContext/FirebaseContext";
import { createStyles, Table, ScrollArea } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

type SavedInfo = {
  userID: string;
  carparkID: string;
  id: string;
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
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [saved, setSaved] = useState<SavedInfo[]>([]);
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);
  const savedCollectionRef = collection(db, "favourites");
  const { user } = useAuth();
  const userSavedCarparks: string[] = [];

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateList = async () => {
    const getSaved = async () => {
      const data = await getDocs(savedCollectionRef);
      setSaved(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };
    getSaved();
  };

  useEffect(() => {
    updateList();
  }, []);

  // const deleteUser = async (id: string) => {
  //   const data = doc(db, "favourites", id);
  //   console.log(id);
  //   await deleteDoc(data);
  //   updateList();
  // };

  const handleClick = (e: React.MouseEvent) => {
    saved.map((del) => {
      if (del.userID === user?.email) {
        console.log(del.id);
        const data = doc(db, "favourites", del.id);
        deleteDoc(data);
        updateList();
      }
    });
  };

  saved.map((info) => {
    if (info.userID === user?.email) {
      userSavedCarparks.push(info.carparkID);
    }
  });

  console.log(saved);

  const rows = ltaCarparkAvail.map((lot) => (
    <tr key={uuid()}>
      {userSavedCarparks.includes(lot.CarParkID) && lot.LotType === "C" ? (
        <>
          {" "}
          <td>{lot.Development}</td>
          <td>{lot.AvailableLots}</td>
          <td>{lot.LotType}</td>
          <td>
            <IconTrash onClick={handleClick} />
          </td>
        </>
      ) : null}
    </tr>
  ));

  return (
    <Container sx={{ maxWidth: 1000 }} mx="auto">
      <h1>User Dashboard</h1>
      <h2>Your saved carparks</h2>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Carpark Location</th>
              <th>Lots Available</th>
              <th>Lot Type</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <Button>
        <Link to="/logout">Sign out</Link>
      </Button>
    </Container>
  );
};

export default Dashboard;
