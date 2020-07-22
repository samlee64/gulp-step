from PIL import Image
import glob
import os
import sys


def format(videoName):
   inputImagePath = "data/images/" + videoName
   inputLabelPath = "data/labels/" + videoName
   outputPath = "data/yoloLabels/" + videoName

   if not os.path.exists(outputPath):
       os.makedirs(outputPath)

   #file_list = [line.rstrip('\n') for line in open("labels.list")]
   file_list = os.listdir(inputImagePath + "/")
   print(inputImagePath)

   num_file = len(file_list)
   print(num_file)

   for i in range(num_file):
       file_name = file_list[i]
       if (not file_name.endswith(".jpg")):
           continue

       print(file_name)

       im = Image.open(inputImagePath + "/" + file_name)
       width, height = im.size
       x_scale = 1./width
       y_scale = 1./height

       yolo_label_file = open(outputPath  + "/" + file_list[i][:-4] + ".txt", "w")
       print(yolo_label_file)

       lines = [line.rstrip('\n') for line in open(inputLabelPath + "/" + file_list[i][:-4] + ".txt")]

       num_lines = len(lines)
       for l in range(num_lines):
           if l == 0:
               continue

           line = lines[l].split()

           x_top_left = float(line[0])
           y_top_left = float(line[1])
           x_bottom_right = float(line[2])
           y_bottom_right =  float(line[3])

           x_center = ((x_top_left + x_bottom_right)/2) * x_scale
           y_center = ((y_top_left + y_bottom_right)/2) * y_scale
           x_width = abs(x_top_left - x_bottom_right) * x_scale
           y_width = abs(y_top_left - y_bottom_right) * y_scale

           #x_center = float(line[0]) * x_scale
           #y_center = float(line[1]) * y_scale
           #x_width = float(line[2]) * x_scale
           #y_width = float(line[3]) * y_scale
           if l == num_lines - 1:
               yolo_label_file.write("0 " + str(x_center) + " " + str(y_center) + " " + str(x_width) + " " + str(y_width))
               continue
           yolo_label_file.write("0 " + str(x_center) + " " + str(y_center) + " " + str(x_width) + " " + str(y_width) + "\n")

       yolo_label_file.close()

       #print("Formatted " + file_list[i])

if __name__ == '__main__':
    with open("videos.list", "r") as fp:
        for line in fp:
            (name, ext) = os.path.splitext(line.rstrip())

            print("Formatting ", name)
            format(name)

