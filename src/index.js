import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FeedsStore } from './store';

const feedsStore = new FeedsStore();
ReactDOM.render(
    <React.StrictMode>
        <App feedsStore={feedsStore} />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
