import type { NextPage } from "next";
import PlyrJS from "../components/Plyr";
import "plyr/dist/plyr.css";

const Home: NextPage = () => {
  return (
    <div>
      <PlyrJS />
    </div>
  );
};

export default Home;
