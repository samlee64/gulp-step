import cv2

# Opens the Video file
cap= cv2.VideoCapture('open-sea-capture1.mkv')
i=0
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break
    if i % 100 == 0: # this is the line I added to make it only save one frame every 20
        print(i)
        cv2.imwrite('Images/001/'+str(i)+'.jpg',frame)
    i+=1

cap.release()
cv2.destroyAllWindows()
