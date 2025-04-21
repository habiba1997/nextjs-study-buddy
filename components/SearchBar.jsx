import React, {useState} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {Search, X} from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import '@/styles/SearchBar.css';

const SearchInput = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        if (onSearch) {
            onSearch(""); // Reset search results when clearing
        }
    };

    return (
        <Row className="justify-content-md-center mb-4">
            <InputGroup className="mb-3 search-container">
                <div className="search-icon-container">
                    <Search className="search-icon" />
                </div>
                <FormControl
                    placeholder="Search by question, tags, or content..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="search-input"
                />
                {searchTerm && (
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleClear}
                        aria-label="Clear search"
                        className="clear-button"
                    >
                        <X />
                    </Button>
                )}
            
            </InputGroup>
        </Row>
    );
};

export default SearchInput;