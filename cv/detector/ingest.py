import cv2

def format_detections(line):
    num_detections = line[0]
    detections = []

    idx = 1
    while idx < len(line):
        xmin, ymin, xmax, ymax = line[idx], line[idx+1], line[idx+2], line[idx+3]
        detections.append([xmin, ymin, xmax, ymax])
        idx+=4

    if len(detections) != num_detections:
        print("number of detections does not match detected detections")

    return detections

def format_trackings(line):
    num_trackings = line[0]
    trackings = []

    idx = 1
    while idx < len(line):
        tracking_id, xcenter, ycenter, width, height = line[idx], line[idx+1], line[idx+2], line[idx+3], line[idx+4]

        x_velocity, y_velocity, is_expanding = line[idx + 5], line[idx + 6], line[idx + 7]

        trackings.append([tracking_id, xcenter, ycenter, width, height, x_velocity, y_velocity, is_expanding])
        idx+=8

    if len(trackings) != num_trackings:
        print("number of trackings does not match detected trackings")

    return trackings


def draw_bounding_boxes(line, img):
    formatted_detections = format_detections(line)

    for detection in formatted_detections:
        if len(formatted_detections) > 0:
            [xmin, ymin, xmax, ymax] = detection

            cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)

    return img

def draw_tracking_bb(line, img):
    trackings = format_trackings(line)

    for tracking in trackings:
        if len(trackings) > 0:

            tracking_id, xcenter, ycenter, width, height = tracking[0], tracking[1], tracking[2], tracking[3], tracking[4]

            xmin = int(xcenter - (width/2))
            ymin = int(ycenter - (height/2))

            xmax = int(xmin + width)
            ymax = int(ymin + height)

            cv2.rectangle(img, (xmin, ymin),  (xmax, ymax), (0, 255, 0), 2)

    return img


def redraw():
    fp = open("jellyfish-capture3-results.txt", "r")

    capture = cv2.VideoCapture("./jellyfish-capture3.mkv")
    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))
    new_height, new_width = frame_height // 2, frame_width // 2


    while True:
        ret, frame_read = capture.read()
        line = fp.readline()
        got_line = [int(x) for x in line.split()]
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)
        frame_resized = cv2.resize(frame_rgb,
                                   (new_width, new_height),
                                   interpolation=cv2.INTER_LINEAR)

        image = draw_bounding_boxes(got_line, frame_resized)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        cv2.imshow('Demo', image)
        cv2.waitKey(3)
    fp.close()
    print("Done")

def redraw_trackings():
    fp = open("results.txt", "r")

    capture = cv2.VideoCapture("./data/videos/moon-jellyfish-capture4.mkv")
    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))

    while True:
        ret, frame_read = capture.read()
        line = fp.readline()
        got_line = [int(x) for x in line.split()]
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)
        frame_resized = cv2.resize(frame_rgb,
                                   (frame_width, frame_height),
                                   interpolation=cv2.INTER_LINEAR)

        image = draw_tracking_bb(got_line, frame_resized)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        cv2.imshow('Demo', image)
        cv2.waitKey(3)
    fp.close()
    print("Done")


if __name__ == "__main__":
    #redraw()
    redraw_trackings()
