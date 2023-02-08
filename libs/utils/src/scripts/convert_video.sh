#!/bin/bash

input_file=$1
output_dir=$2

echo "Input file: $input_file"
echo "Output directory: $output_dir"

# Create the output directory if it does not exist
mkdir -p $output_dir

# Get the input file name without the extension
input_file_name=$(basename "$input_file" .*)

# Create the subfolder for each converted video
mkdir -p $output_dir/${input_file_name}/1080p
mkdir -p $output_dir/${input_file_name}/720p
mkdir -p $output_dir/${input_file_name}/480p
mkdir -p $output_dir/${input_file_name}/360p

# Perform the video conversions using FFmpeg
ffmpeg -i $input_file -s 1920x1080 -c:v libx264 -crf 25 -c:a copy $output_dir/${input_file_name}/1080p/${input_file_name}_1080p.mp4
ffmpeg -i $input_file -s 1280x720 -c:v libx264 -crf 25 -c:a copy $output_dir/${input_file_name}/720p/${input_file_name}_720p.mp4
ffmpeg -i $input_file -s 854x480 -c:v libx264 -crf 25 -c:a copy $output_dir/${input_file_name}/480p/${input_file_name}_480p.mp4
ffmpeg -i $input_file -s 640x360 -c:v libx264 -crf 25 -c:a copy $output_dir/${input_file_name}/360p/${input_file_name}_360p.mp4

# delete original video file
echo "Deleting original video: $input_file"
rm $input_file
