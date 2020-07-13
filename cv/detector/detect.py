import sys, os
sys.path.append(os.path.join(os.getcwd(),'../../../darknet/'))
print(os.path.join(os.getcwd(),'../../../darknet/'))

import darknet
import math
import cv2
import time
import sys
from itertools import combinations

netMain = None
metaMain = None
altNames = None
targetClass = "jellyfish"

def centerToRectangleCoords(x, y, w, h):
    """
    Converts center coordinates to rectangle coordinates
    """

    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    return xmin, ymin, xmax, ymax


def write_detections(results_file, detections):
    """
    1 line per frame
    <num of detections> detections
    detection is <top-left x> <top-left y> <bottom-right x> <bottom-left y>
    """
    results_file.write(str(len(detections)))
    frameDetections = []
    for detection in detections:
        name_tag = str(detection[0].decode())
        if name_tag == targetClass:
            x, y, w, h = detection[2][0],\
                        detection[2][1],\
                        detection[2][2],\
                        detection[2][3]
            xmin, ymin, xmax, ymax = centerToRectangleCoords(float(x), float(y), float(w), float(h))
            frameDetections.append([xmin, ymin, xmax, ymax])
            results_file.write(" " + str(xmin) + " " + str(ymin) + " " + str(xmax) + " " + str(ymax))

    results_file.write("\n")



def draw_bounding_boxes(detections, img):
    if len(detections) > 0:
        for detection in detections:
            detectedClass = str(detection[0].decode())

            if detectedClass == targetClass:
                x, y, w, h = detection[2][0],\
                            detection[2][1],\
                            detection[2][2],\
                            detection[2][3]
                xmin, ymin, xmax, ymax = centerToRectangleCoords(float(x), float(y), float(w), float(h))
                cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)


        text = "Num of {}: {}".format(targetClass, str(len(detections)))
        location = (10,25)
        cv2.putText(img, text, location, cv2.FONT_HERSHEY_SIMPLEX, 1, (246,86,86), 2, cv2.LINE_AA)
    return img




def YOLO():
    global metaMain, netMain, altNames

    try:
        weightPath = sys.argv[1]
    except:
        print("Need to provide weights file")
        sys.exit()
    configPath = "jellyfish.cfg"
    metaPath = "obj.data"

    if not os.path.exists(configPath):
        raise ValueError("Invalid config path `" +
                         os.path.abspath(configPath)+"`")
    if not os.path.exists(weightPath):
        raise ValueError("Invalid weight path `" +
                         os.path.abspath(weightPath)+"`")
    if not os.path.exists(metaPath):
        raise ValueError("Invalid data file path `" +
                         os.path.abspath(metaPath)+"`")
    if netMain is None:
        netMain = darknet.load_net_custom(configPath.encode(
            "ascii"), weightPath.encode("ascii"), 0, 1)  # batch size = 1
    if metaMain is None:
        metaMain = darknet.load_meta(metaPath.encode("ascii"))

    results_file = open("results.txt", "w")

    capture = cv2.VideoCapture("./jellyfish-capture3.mkv")

    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))
    new_height, new_width = frame_height // 2, frame_width // 2
    print("Video Resolution: ", (frame_width, frame_height))
    print("new widths, heights", new_width, new_height)

    output = cv2.VideoWriter(
            "output.avi", cv2.VideoWriter_fourcc(*"MJPG"), 10.0,
            (new_width, new_height))

    darknet_image = darknet.make_image(new_width, new_height, 3)


    while True:
        prev_time = time.time()
        ret, frame_read = capture.read()

        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)

        frame_resized = cv2.resize(frame_rgb,
                                   (new_width, new_height),
                                   interpolation=cv2.INTER_LINEAR)

        darknet.copy_image_from_bytes(darknet_image,frame_resized.tobytes())

        detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.25)

        write_detections(results_file, detections)

        image = draw_bounding_boxes(detections, frame_resized)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    #    print(1/(time.time()-prev_time))
        cv2.imshow('Demo', image)
        cv2.waitKey(3)
        output.write(image)

    capture.release()
    output.release()
    f.close()
    print("Done")



if __name__ == "__main__":
    YOLO()
