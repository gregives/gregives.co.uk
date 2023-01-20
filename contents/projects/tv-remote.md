---
title: TV Remote
date: 2018-12-01
image: /assets/images/dynamic/tv-remote/unphone.jpg
description: Firmware for the unPhone, a souped-up ESP32 with an LCD touchscreen, to control televisions from a number of manufacturers.
tags:
  - C++
  - unPhone
  - ESP32
  - Arduino
  - Internet of Things
  - Infrared remote
---

During my third year of university, I undertook a module on the Internet of Things. As part of this module, we were tasked to create a piece of firmware for the [unPhone](https://unphone.net/the-unphone/).

> The unPhone is an IoT development platform from the University of Sheffield, Pimoroni and BitFIXit that builds on one of the easiest and most popular networked microcontrollers available, the ESP32.

With my lab partner, we decided to create a TV remote using the unPhone, capable of controlling many different models of televisions.

![Screenshot of the interface and final TV remote](/assets/images/dynamic/tv-remote/interface.png)

## Making the Remote

One of the most important aspects of a remote is its layout. Therefore, our first step was to design what our remote would look like; we based our remote on a typical Sony remote, however, due to the unphone's size we decided to only show the most relevant buttons on the remote screen. We were constrained to a black and white bitmap, in order to render the design on the unPhone using Adafruit's GFX `drawBitmap` function. The GFX library required our design in the frustrating C++ "byte array" format of our design --- first we designed the GUI in Photoshop, before using the convenient [image2cpp](http://javl.github.io/image2cpp/) tool.

Essential to the IR remote was the ability to accurately transmit IR signals to the target device. In order to this, we used the [IR remote library by z3t0](https://github.com/SensorsIot/Definitive-Guide-to-IR). However, this only supports receiving of IR signals on the ESP32: [a fork of this library by Andreas Speiss](https://github.com/SensorsIot/Definitive-Guide-to-IR) provides the missing send functionality.

## Testing the Remote

In order to test our unPhone remote, we created a receiver using an Arduino Uno and an LCD screen. We tested both the range and the angle of operation of the unphone remote. We found that the angle of operation, i.e. the angle between axes of the IR LEDs and the IR receiver, made little difference to the remote's performance: the only caveat being the IR LEDs needed to be in direct line of sight to the receiver. This meant that the remote actually performed better without the unphone case on, as the case protruded around the LEDs, blocking the IR signal at extreme angles.

If in direct line of sight to the receiever, the range of the unphone remote was impressive. We took measurements every 50cm all the way from 0cm to 500cm, where the signal eventually failed. At each distance, we pressed 30 random buttons on the remote, and recorded whether the IR receiver measured the correct signal. We also used a standard Sony remote at each distance to act as a control, and to ensure that any errors were the cause of the transmitter, not the receiver.

![Graph showing the accuracy of the remote at varying range](/assets/images/dynamic/tv-remote/testing.png)
