#!/usr/bin/env bash

if [[ $1 =~ \.mkv$ ]]; then
  if [ ! -f "$1" ]; then
    echo "Cannot find videofile. Downloading videofile"
    aws s3 cp s3://gulp-step/videos/$1 .

    echo "Generating Samples"
    python3 generate_samples.py $1
  else
    echo "Videofile is already downloaded"
  fi

  echo "Running main"
  python3 main.py
else
  echo "not mkv"
fi
