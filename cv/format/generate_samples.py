import cv2
import sys

try:
    inputVideo = sys.argv[1]
    outputPath = sys.argv[2]
except:
    print("Need to provide <inputVideoPath> <outputPath>")
    sys.exit()

cap= cv2.VideoCapture(inputVideo)
i=0
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break
    if i % 100 == 0: # this is the line I added to make it only save one frame every 20
        print(outputPath + '/'+str(i)+'.jpg')
        cv2.imwrite(outputPath + '/'+str(i)+'.jpg',frame)
    i+=1

cap.release()
cv2.destroyAllWindows()
