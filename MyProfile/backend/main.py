## adding utilities to path
import os
import sys

utilities_path = os.path.join(os.getcwd(), "ml_tools", "utilities")
sys.path.insert(0, utilities_path)


from flask import Flask, request
from flask_cors import CORS

## importing ML functions
from ml_tools.disaster_tweets_predictor.disaster_tweets_predictor import predict as disaster_tweet_predict


## creating app
app = Flask(__name__)
CORS(app)

## endpoint for handling disaster tweets classification
@app.post("/mlkit/predict/disaster_tweets")
def predict_tweet():
    tweet = request.get_json()["text"]
    result = disaster_tweet_predict(tweet)
    return result


if __name__ == "__main__":
    app.run(debug=True)