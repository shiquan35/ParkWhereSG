import { useState, useEffect } from "react";
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
  id: string;
  userEmail: string;
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

  // to get the most updated saved information from the user
  const updateList = () => {
    const getSaved = async () => {
      const data = await getDocs(savedCollectionRef);
      setSaved(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };
    getSaved();
  };

  useEffect(() => {
    updateList();
  }, []);

  saved.map((info) => {
    if (info.userID === user?.email) {
      userSavedCarparks.push(info.carparkID);
    }
  });

  // combining the map of ltaCarparkAvail and saved so that the documentId from firestore is accessible
  const combinedMap = ltaCarparkAvail
    .map((lot) => {
      let savedID = saved.find((el) => el.carparkID === lot.CarParkID);
      if (savedID?.id && savedID.userID) {
        lot.id = savedID.id;
        lot.userEmail = savedID.userID;
      }
      return lot;
    })
    .filter((lot) => lot.id !== undefined && lot.LotType === "C");

  //allows user to delete items that they have saved into their dashboard
  const deleteData = async (id: string) => {
    const data = doc(db, "favourites", id);
    await deleteDoc(data);
    // it doesnt update immediately after deleting?
    updateList();
  };

  // bug found: if user keeps clicking on the same favourites button, firestore will keep creating a collection of it
  // if user clicks twice, although dashboard will appear one entry, clicking on delete once will not delete it as it has another collection
  // with the same info, just different ID
  const rows = combinedMap.map((lot) => (
    <tr key={uuid()}>
      {lot.userEmail === user?.email ? (
        <>
          <td>{lot.Development}</td>
          <td>{lot.AvailableLots}</td>
          <td>{lot.LotType}</td>
          <td>
            <IconTrash onClick={() => deleteData(lot.id)} />
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
