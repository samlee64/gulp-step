import glob
import os
import sys

image_dir = "/home/bongoscombos/workspace/gulp-step/cv/format/data/images"

if len(sys.argv) < 2:
    print("Need to provide at least one video_name")
    sys.exit()

args = sys.argv[1:]

# Percentage of images to be used for the test set
percentage_test = 10
# Create and/or truncate train.txt and test.txt
file_train = open('train.txt', 'w')
file_test = open('test.txt', 'w')
# Populate train.txt and test.txt
counter = 1
index_test = round(100 / percentage_test)

for arg in args:
    image_sub_dir = os.path.join(image_dir, arg)
    file_iterator = glob.iglob(os.path.join(image_sub_dir, "*.jpg"))
    print(image_sub_dir)

    for pathAndFilename in file_iterator:
        title, ext = os.path.splitext(os.path.basename(pathAndFilename))
        if counter == index_test:
            counter = 1
            file_test.write(image_sub_dir + "/" + title + '.jpg' + "\n")
        else:
            file_train.write(image_sub_dir + "/" + title + '.jpg' + "\n")
            counter = counter + 1
