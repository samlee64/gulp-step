import pickle


def ingest():
    file = open("results", "rb")
    detections = pickle.load(file)
    print(detections)
    return detections


if __name__ == "__main__":
    ingest()
