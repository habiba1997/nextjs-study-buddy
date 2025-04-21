"use client";

import Feed from "@components/Feed";
import SearchBar from "@components/SearchBar";
import { useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/data.json");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Search across multiple fields
    const dataFiltered = data.filter((item) => {
      // Search in question
      if (item.question?.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      // Search in answer
      if (item.answer?.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      // Search in sideNote
      if (item.sideNote?.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      // Search in mainTag
      if (item.mainTag?.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      // Search in tags
      if (item.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
        return true;
      }
      
      // Search in notes
      if (item.notes?.some(note => note.toLowerCase().includes(lowerSearchTerm))) {
        return true;
      }
      
      return false;
    });
    
    setFilteredData(dataFiltered);
  };

  // Memoize the search results to prevent unnecessary re-renders
  const searchResults = useMemo(() => {
    return filteredData;
  }, [filteredData]);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Organize & Access <br className="max-md:hidden" /> Your Resources
        Information
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> </span>
      </h1>
      <p className="desc text-center">
        Collect and Store important resources for quick retrieval
      </p>
      <Container>
        <SearchBar onSearch={handleSearch} />
        {isLoading ? (
          <div className="text-center">
            <p>Loading data...</p>
          </div>
        ) : (
          <Feed questionList={searchResults} />
        )}
        {!isLoading && searchResults.length === 0 && searchTerm && (
          <div className="text-center mt-4">
            <p>No results found for "{searchTerm}". Try a different search term.</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Home;
