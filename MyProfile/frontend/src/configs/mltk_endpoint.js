import CONFIG from "./config";

const MLTK_ENDPOINTS = {
    DISASTER_TWEETS: CONFIG["MLTK_ORIGIN"] + "/predict/disaster_tweets"
}

export default MLTK_ENDPOINTS;