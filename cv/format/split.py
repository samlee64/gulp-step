import glob
import os
import sys

image_dir = "/home/bongoscombos/workspace/gulp-step/cv/format/data/images"

# Percentage of images to be used for the test set
percentage_test = 10
# Create and/or truncate train.txt and test.txt
file_train = open('train.txt', 'w')
file_test = open('test.txt', 'w')
# Populate train.txt and test.txt
counter = 1
index_test = round(100 / percentage_test)

with open("videos.list", "r") as fp:
    for line in fp:
        (name, ext) = os.path.splitext(line.rstrip())

        image_sub_dir = os.path.join(image_dir, name)
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
