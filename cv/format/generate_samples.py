import cv2
import os
import sys

with open("videos.list", "r") as fp:
    for line in fp:
        videoName = line.rstrip()
        inputVideo =  "data/videos/" + videoName

        (name, ext) = os.path.splitext(videoName)
        outputImagePath = "data/images/" + name

        if not os.path.exists(outputImagePath):
            os.makedirs(outputImagePath)

        print(inputVideo, outputImagePath)

        cap= cv2.VideoCapture(inputVideo)
        i=0
        while(cap.isOpened()):
            ret, frame = cap.read()
            if ret == False:
                break
            if i % 100 == 0: # this is the line I added to make it only save one frame every 20
                print(outputImagePath + '/'+str(i)+'.jpg')
                cv2.imwrite(outputImagePath + '/'+str(i)+'.jpg',frame)
            i+=1

        cap.release()
