import axios from "axios";
const corsUrl = "https://rss-to-json.cae.workers.dev/?url=";

export const getFeedListing = url => axios.get(`${corsUrl}${url}`);
