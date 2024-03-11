import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SourcesPage.css';
import { observer } from 'mobx-react';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Es necesario que proporciones un nombre'),
    url: yup
        .string()
        .required('Una URL es requerida')
        .matches(
            /(https?:\/\/)?([\w-])+.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
            'El enlace debe ser una URL válida'
        ),
});

function SourcesPage({ feedsStore }) {
    const [initialized, setInitialized] = useState(false);

    const handleSubmit = async evt => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        feedsStore.feeds.push(evt);
        feedsStore.setFeeds(feedsStore.feeds);
        localStorage.setItem('feeds', JSON.stringify(feedsStore.feeds));
    };

    const deleteFeed = index => {
        feedsStore.feeds.splice(index, 1);
        feedsStore.setFeeds(feedsStore.feeds);
        localStorage.setItem('feeds', JSON.stringify(feedsStore.feeds));
    };

    useEffect(() => {
        if (!initialized) {
            let rssFeeds = [];
            try {
                rssFeeds = JSON.parse(localStorage.getItem('feeds'));
                if (Array.isArray(rssFeeds)) {
                    feedsStore.setFeeds(rssFeeds);
                } else {
                    feedsStore.setFeeds(feedsStore.feeds);
                }
            } catch (ex) {
                console.error(ex);
            }
            setInitialized(true);

        }
    }, [initialized, feedsStore]);

    return (
        <div className="sources-page">
            <h1 className="center">Fuentes de noticias</h1>
            <p className="my-4 text-secondary">{'Puedes agregar fácilmente una nueva fuente proporcionando su \'Nombre\' y \'URL\', y luego haz clic en \'Agregar\'. Cada fuente se lista a continuación, y puedes eliminar cualquiera haciendo clic en \'Eliminar\'.'}</p>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{ name: '', url: '' }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row className="gx-2 gy-3 email-form d-flex align-items-end">
                            <Form.Group as={Col} md="12" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={values.name || ''}
                                    onChange={handleChange}
                                    isInvalid={touched.name && errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="url">
                                <Form.Label>Enlace</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="url"
                                    placeholder="Enlace"
                                    value={values.url || ''}
                                    onChange={handleChange}
                                    isInvalid={touched.url && errors.url}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.url}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Añadir</Button>
                        </Form.Row>
                    </Form>
                )}
            </Formik>
            <br />
            {feedsStore.feeds.map((f, i) => {
                return (
                    <Card key={i} className="card-animation">
                        <Card.Body>
                            <Card.Title>{f.name}</Card.Title>
                            <Card.Text>{f.url}</Card.Text>
                            <Button variant="primary" onClick={() => deleteFeed(i)}>
                Eliminar
                            </Button>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}

SourcesPage.propTypes = {
    feedsStore: PropTypes.shape({
        setFeeds: PropTypes.func.isRequired,
        feeds: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default observer(SourcesPage);
