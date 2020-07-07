import cv2

# Opens the Video file
cap= cv2.VideoCapture('data/input/video/open-sea-1080.mp4')
i=0
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break
    if i % 100 == 0: # this is the line I added to make it only save one frame every 20
        cv2.imwrite('data/input/samples/open-sea/'+str(i)+'.jpg',frame)
    i+=1

cap.release()
cv2.destroyAllWindows()
