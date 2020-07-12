from PIL import Image
import glob
import os
import sys

if __name__ == '__main__':
   try:
       videoName = sys.argv[1]
   except:
       print("Need to provide videoName")
       sys.exit()

   inputImagePath = "data/images/" + videoName
   inputLabelPath = "data/labels/" + videoName
   outputPath = "data/yoloLabels/" + videoName

   #file_list = [line.rstrip('\n') for line in open("labels.list")]
   file_list = os.listdir(inputImagePath + "/")

   num_file = len(file_list)
   for i in range(num_file):
       file_name = file_list[i]
       if (not file_name.endswith(".jpg")):
           continue

       im = Image.open(inputImagePath + "/" + file_name)
       width, height = im.size
       x_scale = 1./width
       y_scale = 1./height

       yolo_label_file = open(outputPath  + "/" + file_list[i][:-4] + ".txt", "a")

       lines = [line.rstrip('\n') for line in open(inputLabelPath + "/" + file_list[i][:-4] + ".txt")]

       print(lines)
       print("foobar")
       num_lines = len(lines)
       for l in range(num_lines):
           if l == 0:
               continue

           line = lines[l].split()
           print(l, line)
           x_center = float(line[0]) * x_scale
           y_center = float(line[1]) * y_scale
           x_width = float(line[2]) * x_scale
           y_width = float(line[3]) * y_scale
           if l == num_lines - 1:
               yolo_label_file.write("0 " + str(x_center) + " " + str(y_center) + " " + str(x_width) + " " + str(y_width))
               continue
           yolo_label_file.write("0 " + str(x_center) + " " + str(y_center) + " " + str(x_width) + " " + str(y_width) + "\n")
           print("0 " + str(x_center) + " " + str(y_center) + " " + str(x_width) + " " + str(y_width) + "\n")
       print("Formatted " + file_list[i])
