# Chapter 3 — Introduction to ROS 2

ROS 2 (Robot Operating System 2) is the foundational software framework for modern robotics. It acts as the nervous system of a robot.

## 3.1 ROS Nodes

Nodes are small programs that perform tasks like:

Reading sensors

Controlling motors

Running perception models

## 3.2 Topics

Nodes exchange data by publishing/subscribing to topics, such as:

/camera/image

/scan

/cmd_vel

## 3.3 Services

Provide request-response communication.
Example:
“Move arm to position (x, y, z).”

## 3.4 Actions

Used for long-running tasks:

Navigating to a location

Picking up an object

## 3.5 ROS Workspaces

Workspaces contain packages built with:

colcon build

## 3.6 Launch Files

Start multiple nodes automatically in one command.