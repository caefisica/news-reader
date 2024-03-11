import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router-dom';
import './TopBar.css';

function TopBar({ location }) {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="px-3">
            <Navbar.Brand href="/" className="font-weight-bold">RSS para Físicos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/sources" active={location.pathname === '/sources'}>
            Fuentes
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

TopBar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default withRouter(TopBar);
