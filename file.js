const fs = require('fs');
const ffmpeg = require("fluent-ffmpeg");
// ffmpeg static install correct ffmpeg automatically for you
const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');
// Points fluent-ffmpeg to the right location to look for ffmpeg
ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

// ffmpeg()
//   .input(fs.createReadStream('./video-gb.mp4'))
//   .inputFormat('mp4')
//   .on('end', () => {
//     console.log('done')
//   })
//   .save('./video-gb.flac')


const readStream = fs.createReadStream('video-gb.mp4');
const writeStream = fs.createWriteStream('video-gb.mp3');

ffmpeg()
  .input(readStream)
  .inputFormat('mp4')
  .on('end', () => {
    console.log('Successfully converted video');
  })
  .on('error', (err, stdout, stderr) => {
    console.error('Error on conversion', err.message);
    console.error('stdout:', stdout);
    console.error('stderr:', stderr);
  })
  .outputFormat('mp3')
  .save(writeStream)