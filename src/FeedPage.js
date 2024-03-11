import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FeedPage.css';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getFeedListing } from './requests';

function ListingCard({ listing, openLink }) {
    return (
        <Card className="mb-4 card-animation">
            <Card.Body>
                <Card.Title className="p-0">{listing.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{new Date(listing.pubDate).toDateString()} - {listing.source}</Card.Subtitle>
                <Card.Text>
                    {listing.description}
                </Card.Text>
                <Card.Text>
                    {listing.content}
                </Card.Text>
                <Button variant="primary" onClick={() => openLink(listing.link)}>
          Leer más
                </Button>
            </Card.Body>
        </Card>
    );
}

function FeedPage({ location }) {
    const [initialized, setInitialized] = useState(false);
    const [listings, setListings] = useState([]);
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    const getListings = async url => {
        try {
            const response = await getFeedListing(url);
            setListings(response.data.items);
            setData(response.data.feed);
            setError(null);
        } catch (ex) {
            setError(ex.message);
        }
    };

    const openLink = url => {
        window.location.href = url;
    };

    useEffect(() => {
        if (!initialized) {
            const params = new URLSearchParams(location.search);
            const url = params.get('url');
            getListings(url);
            setInitialized(true);
        }
    }, [initialized, location.search]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="feed-page">
            <h1 className="center title">
                {data.image && <img src={data.image} alt={data.title} />} {data.title}
            </h1>
            {listings.map((l, index) => (
                <ListingCard key={index} listing={l} openLink={openLink} />
            ))}
        </div>
    );
}

ListingCard.propTypes = {
    listing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pubDate: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    }).isRequired,
    openLink: PropTypes.func.isRequired,
};

FeedPage.propTypes = {
    feedsStore: PropTypes.any,
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }).isRequired,
};

export default withRouter(observer(FeedPage));
