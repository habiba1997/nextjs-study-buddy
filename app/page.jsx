"use client";

import Feed from "@components/Feed";
import SearchBar from "@components/SearchBar";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Organize & Access <br className="max-md:hidden" /> Your Resources Information
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> </span>
      </h1>
      <p className="desc text-center">
        Collect and Store important resources for quick retrieval
      </p>
      <Container>
        <SearchBar />
        <Feed />
      </Container>
    </section>
  );
};

export default Home;
