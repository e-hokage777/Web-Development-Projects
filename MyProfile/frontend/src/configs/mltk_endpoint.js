import CONFIG from "./config";

const MLTK_ENDPOINTS = {
    DISASTER_TWEETS: CONFIG["MLTK_ORIGIN"] + "/predict/disaster_tweets",
    ANIME_FACE_GENERATOR: CONFIG["MLTK_ORIGIN"] + "/generate/anime_face"
}

export default MLTK_ENDPOINTS;