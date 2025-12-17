# Chapter 4 — ROS 2 for Humanoid Robotics
## 4.1 URDF (Unified Robot Description Format)

URDF defines the robot’s:

Links

Joints

Sensors

Actuators

Mass and inertia

It is the robot’s digital skeleton.

## 4.2 Humanoid Kinematics

Kinematics define how robot joints move.

Forward Kinematics: Joint angles → hand/foot position

Inverse Kinematics: Desired position → required joint angles

## 4.3 Controllers

Control strategies used:

PID Controllers

Joint Trajectory Controllers

Whole-Body Controllers

## 4.4 Control Feedback Loop

Sensor data → controller → motor movement → new sensor data
This loop stabilizes the humanoid robot.