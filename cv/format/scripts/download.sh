#!/usr/bin/env bash

echo "Hello there"

list=`cat videos.list`

for item in $list
do
  echo "Downloading Video: $item"
  aws s3 cp s3://gulp-step/videos/$item data/videos/

  labelName=${item%.mkv}

  echo "Downloading Labels: $labelName"
  #TODO s3 needs to get restructured
  aws s3 cp s3://gulp-step/Labels/$item/ data/labels/$labelName --recursive
done
