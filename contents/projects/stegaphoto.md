---
title: StegaPhoto
date: 09/2017
image: stegaphoto/screenshot.png
description: >-
  Cyber security research project on steganography — created a web application which can hide any number of files inside an image.
tags:
  - JavaScript
  - Steganography
  - SubtleCrypto
  - Web workers
  - Bootstrap
---

During Summer 2017, I undertook a cyber security research project, creating a web application which can hide files inside an image, a form of _steganography_. Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny.

<lazy-image src="stegaphoto/hide.png" alt="Screenshot of the user interface to hide files" />

# How StegaPhoto Works

StegaPhoto is built in vanilla JavaScript using SubtleCrypto, Web Workers, JSZip and Bootstrap ---  StegaPhoto does not send any data to a server, it uses only client-side JavaScript. There were two viable methods to hide files inside images:

- Hiding the file data within the image data, replacing unnecessary image data with the information to be hidden. This method usually works by hiding the data in the least significant bits of the colour component of images. The file size remains the same (as data is only replaced, not added) which means that the steganography is hard to spot, but only a very small amount of information can be hidden in each image.

- Adding the file data alongside the image data, which increases the total file size but retains the full image quality. By adding hidden data into an ignored section of a file, such as after the logical end of the image, any amount of information can be hidden. However, this method is easier to spot as the file size will increase and the file can be examined to show the extra information.

The second method was chosen as the focus for the project, with the view of the end user hiding any number of files in an image, irrespective of the resolution of that image. StegaPhoto uses end of file (EOF) markers to add data which would not usually be found within an image file.

```
|   Original image file   |
| Contents of image | EOF | Encrypted ZIP |
```

For more information, have a look at [the StegaPhoto repository](https://github.com/gregives/StegaPhoto).