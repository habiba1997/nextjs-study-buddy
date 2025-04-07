import React, {useState} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';

const SearchInput = ( {onSearch} ) => {
    const [searchTerm, setSearchTerm] = useState( "" );

    const handleSearch = () => {
        console.log( "searchTerm", searchTerm );
        if ( onSearch ) {
            onSearch( searchTerm );
        }
    };

    return (
        <Row className="justify-content-md-center">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={( e ) => setSearchTerm( e.target.value )}
                />
                <Button variant="primary" onClick={handleSearch}>
                    <Search/>
                </Button>
            </InputGroup>
        </Row>
    );
};

export default SearchInput;