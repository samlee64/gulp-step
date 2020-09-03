import sys
import os
sys.path.append(os.path.join(os.getcwd(), '../../../darknet/'))
sys.path.append(os.path.join(os.getcwd(), '../../../sort/'))

from sort import *
import darknet
import math
import cv2
import time
import sys
import numpy as np
from itertools import combinations

netMain = None
metaMain = None
altNames = None
target_class = "jellyfish"


def update_tracker(mot_tracker, detections):
    """
    Updates object tracker
    """
    formatted_trackers = []
    for detection in detections:
        confidence = detection[1]
        x, y, w, h = detection[2]

        xmin, ymin, xmax, ymax = centerToRectangleCoords(float(x), float(y), float(w), float(h))
        formatted_tracker = np.array([xmin, ymin, xmax, ymax, confidence])
        formatted_trackers.append(formatted_tracker)

    formatted_trackers = np.array(formatted_trackers)
    trackers = mot_tracker.update(formatted_trackers)

    return trackers


def draw_tracked_bb(trackers, img):
    """
    Draw tracked objects
    """
    if len(trackers) > 0:
        for tracker in trackers:
            xmin, ymin, w, h = int(tracker[0]),\
                        int(tracker[1]),\
                        int(tracker[2] - tracker[0]),\
                        int(tracker[3] - tracker[1])
            tracking_id = int(tracker[4])

            location = (xmin, ymin)

            cv2.rectangle(img, location, (xmin+w, ymin+h), (255, 0, 0), 2)
            cv2.putText(img, str(tracking_id), location, cv2.FONT_HERSHEY_SIMPLEX, 1, (246,86,86), 2, cv2.LINE_AA)

    return img

def centerToRectangleCoords(center_x, center_y, w, h):
    """
    Converts center coordinates to rectangle coordinates
    """

    xmin = int(round(center_x - (w / 2)))
    xmax = int(round(center_x + (w / 2)))
    ymin = int(round(center_y - (h / 2)))
    ymax = int(round(center_y + (h / 2)))
    return xmin, ymin, xmax, ymax


def write_detections(results_file, detections):
    """
    1 line per frame
    format is: <num of detections> detections
    detection is <top-left x> <top-left y> <bottom-right x> <bottom-left y>
    """
    results_file.write(str(len(detections)))
    for detection in detections:
        name_tag = str(detection[0].decode())
        if name_tag == target_class:
            x, y, w, h = detection[2][0],\
                        detection[2][1],\
                        detection[2][2],\
                        detection[2][3]

            xmin, ymin, xmax, ymax = centerToRectangleCoords(float(x), float(y), float(w), float(h))
            results_file.write(" " + str(xmin) + " " + str(ymin) + " " + str(xmax) + " " + str(ymax))

    results_file.write("\n")

def write_trackers(results_file, trackers):
    """
    1 line per frame
    format is: <num of tracked objs> trackers
    tracker is <tracker_id> <x center> <y center> <width> <height> <x_velocity> <y_velocity> <is_expanding>
    """
    results_file.write(str(len(trackers)))


    if len(trackers) > 0:
        for tracker in trackers:
            xmin, ymin, width, height = int(tracker[0]),\
                        int(tracker[1]),\
                        int(tracker[2] - tracker[0]),\
                        int(tracker[3] - tracker[1])

            tracking_id = int(tracker[4])

            xcenter = int(xmin + (width/2))
            ycenter = int(ymin + (height/2))

            (x_velocity, y_velocity) = calculate_tracker_velocity(tracking_id, xcenter, ycenter)
            is_expanding = calculate_expansion(tracking_id, width, height)

            results_file.write(" " + str(tracking_id) + " " + str(xcenter) + " " + str(ycenter) + " " + str(width) + " " + str(height) + " " + str(x_velocity) + " " + str(y_velocity) + " " + str(is_expanding))


        results_file.write("\n")


#How big should my velocity jump be
#how many frames should I consider for my velocity calculation
#I'm going to calculate velocity
#Velocity relative to previous frame
#Velocity relative to n previous frames
#Average those velocities out


#Going to be pixels per frame
#Should be pixels per sec but laz
velocity_dict = {}
def calculate_tracker_velocity(tracking_id, xcenter, ycenter):
    if velocity_dict.get(tracking_id):
        (prev_xcenter, prev_ycenter) = velocity_dict.get(tracking_id)

        x_traveled = xcenter - prev_xcenter
        y_traveled = ycenter - prev_ycenter

        velocity_dict[tracking_id] = (xcenter, ycenter)

        return (x_traveled, y_traveled)


    else:
        velocity_dict[tracking_id] = (xcenter, ycenter)
        return (0, 0)

expansion_dict = {}
def calculate_expansion(tracking_id, width, height):
    """
    0 if shrinking
    1 if expanding
    """
    if expansion_dict.get(tracking_id):
        (prev_width, prev_height) = expansion_dict.get(tracking_id)
        expansion_dict[tracking_id] = (width, height)

        width_diff = width - prev_width
        height_diff = height - prev_height

        #I should just take the more extreme of the two
        bigger_diff = width_diff if abs(width_diff) > abs(height_diff) else height_diff

        if bigger_diff < 0:
            return 0
        else:
            return 1
    else:
        expansion_dict[tracking_id] = (width, height)
        return 0

def draw_bounding_boxes(detections, img):
    if len(detections) > 0:
        for detection in detections:
            detectedClass = str(detection[0].decode())

            if detectedClass == target_class:
                confidence = round(detection[1], 2)
                x, y, w, h = detection[2][0],\
                            detection[2][1],\
                            detection[2][2],\
                            detection[2][3]
                xmin, ymin, xmax, ymax = centerToRectangleCoords(float(x), float(y), float(w), float(h))
                cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)

                cv2.putText(img, str(confidence), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (246,86,86), 2, cv2.LINE_AA)


        text = "Num of {}: {}".format(target_class, str(len(detections)))
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
    configPath = "moon-jellyfish.cfg"
    metaPath = "moon-jellyfish.data"

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

    capture = cv2.VideoCapture("./data/videos/moon-jellyfish-capture4.mkv")

    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))
#    new_height, new_width = frame_height // 2, frame_width // 2
    new_height, new_width = frame_height, frame_width
    print("Video Resolution: ", (frame_width, frame_height))
    print("new widths, heights", new_width, new_height)

    (weightName, ext) = os.path.splitext(weightPath)
    outputPath = os.path.join("output", weightName)
    print("outputPath", outputPath)

    if not os.path.exists(outputPath):
        os.makedirs(outputPath)

    output = cv2.VideoWriter(
            outputPath + "/sorted-output.avi", cv2.VideoWriter_fourcc(*"MJPG"), 10.0,
            (new_width, new_height))

    darknet_image = darknet.make_image(new_width, new_height, 3)

    mot_tracker = Sort(max_age=1, min_hits=0)

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

        trackers = update_tracker(mot_tracker, detections)
        draw_tracked_bb(trackers, frame_resized)

        write_trackers(results_file, trackers)

        image = draw_bounding_boxes(detections, frame_resized)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        cv2.imshow('Movie', image)
        cv2.waitKey(3)
        output.write(image)

    capture.release()
    output.release()
    results_file.close()
    print("Done")



if __name__ == "__main__":
    YOLO()
