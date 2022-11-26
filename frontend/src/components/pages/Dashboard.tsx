import { Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      <h1>User Dashboard</h1>
      <Button>
        <Link to="/logout">Sign out</Link>
      </Button>
    </Container>
  );
};

export default Dashboard;
