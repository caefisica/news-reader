import { observable, action, makeObservable } from 'mobx';

class FeedsStore {
    constructor() {
        this.feeds = [];
        makeObservable(this, {
            feeds: observable,
            setFeeds: action,
        });
    }

    setFeeds = (feeds) => {
        this.feeds = feeds;
    };
}

const feedsStore = new FeedsStore();

export default feedsStore;