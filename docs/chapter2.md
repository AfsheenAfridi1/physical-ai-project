# Chapter 2 — Sensor Systems and Perception

Perception is the foundation of Physical AI. Humanoid robots use multiple sensors to understand the world in 3D.

# 2.1 RGB Cameras

Normal color cameras used for:

Object detection

Gesture recognition

Scene understanding

Visual tracking

# 2.2 Depth Cameras

Depth cameras (like Intel RealSense D435i) measure the distance of each pixel from the robot.
Used for:

Obstacle detection

3D mapping

Object grasping

Navigation

# 2.3 LiDAR

LiDAR creates a 360° 3D map of the environment using lasers.
Used for:

SLAM (Simultaneous Localization and Mapping)

Indoor/outdoor navigation

Robot safety

# 2.4 IMU (Inertial Measurement Unit)

Measures:

Acceleration

Rotation

Orientation

Critical for:

Balance

Bipedal walking

Fall detection

## 2.5 Force/Torque Sensors

Placed in joints and hands.
Used to measure:

Grip strength

Contact pressure

Weight of objects

## 2.6 Sensor Fusion

Combines all sensors to build a stable, accurate understanding of the environment.