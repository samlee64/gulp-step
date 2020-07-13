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


def draw_bounding_boxes(line, img):
    formatted_detections = format_detections(line)

    for detection in formatted_detections:
        if len(formatted_detections) > 0:
            [xmin, ymin, xmax, ymax] = detection

            cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)

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




if __name__ == "__main__":
    redraw()
