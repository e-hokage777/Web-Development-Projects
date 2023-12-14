import pickle
import numpy as np
import os

from tweet_transformer import TweetTransformer

## getting necessary tools
transformer = None
model = None

utilities_path = os.path.join(os.getcwd(), "ml_tools", "utilities")

## creating transformer
transformer = None
word_vector_dict = None

with open(os.path.join(utilities_path, "disaster_tweets_word_vectors.pickle"), "rb") as file:
    word_vector_dict = pickle.load(file)

transformer = TweetTransformer(**word_vector_dict)

## loading classifier
with open(os.path.join(utilities_path, "disaster_tweets_classifier.pickle"), "rb") as file:
    model = pickle.load(file)


def predict(text):
    result = {}
    prediction = model.predict(transformer.transform(text))
    result["prediction"] = int(prediction[0])
    result["probability"] = float(np.max(model.predict_proba(transformer.transform(text)), 1)[0])

    return result
