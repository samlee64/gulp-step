# Install
Need to install aws cli and credentials configured. I'll generate credentials for you guys.


Need to have opencv, Pillow installed.

```
pip3 install opencv-python
```

```
pip3 install Pillow
```


# Run
Download the your video.
```
aws s3 cp s3://gulp-step/videos/<insert video name> .
```

Generate images from your video to annotate. 
Open up `generate_images.py` and modify line 4 with the name of your video.
```
python3 generate_samples.py
```

Start to annotate images.
```
python3 main.py
```
Type '1' into the Load bar and press 'Load'. Try to make the bounding boxes as tight as possible around the fish/jellyfish/aquatic animal.


Upload your annotations to S3 (cloud storage/Dropbox from programmers).
```
aws s3 cp Labels/001/ s3://gulp-step/Labels/<insert video name>/ --recursive
```
