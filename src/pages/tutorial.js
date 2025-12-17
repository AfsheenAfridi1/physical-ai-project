import React from 'react';
import Layout from '@theme/Layout';
import './tutorial.css';

export default function Tutorial() {
  return (
    <Layout title="Tutorials">
      <div className="tutorial-page">
        <h1 className="title">🚀 Tutorials</h1>
        <p className="subtitle">
          Learn Physical AI step-by-step — from basics to advanced robotics
        </p>

        <div className="grid">

          {/* CARD 1 */}
          <div className="card">
            <span className="tag beginner">Beginner</span>
            <h2>Getting Started with Physical AI</h2>
            <p>
              What is Physical AI, humanoid robots, and embodied intelligence.
            </p>
            <a href="/docs/getting-start/intro" className="btn">
              ▶ Start Tutorial
            </a>
          </div>

          {/* CARD 2 */}
          <div className="card">
            <span className="tag intermediate">Intermediate</span>
            <h2>ROS 2 Fundamentals</h2>
            <p>
              Nodes, topics, services, actions, and robot control.
            </p>
            <a href="/docs/ros2/intro" className="btn">
              ▶ Start Tutorial
            </a>
          </div>

          {/* CARD 3 */}
          <div className="card">
            <span className="tag intermediate">Intermediate</span>
            <h2>Simulation using Gazebo & Unity</h2>
            <p>
              Digital twins, physics, sensors, and environments.
            </p>
            <a href="/docs/simulation/intro" className="btn">
              ▶ Start Tutorial
            </a>
          </div>

          {/* CARD 4 */}
          <div className="card">
            <span className="tag advanced">Advanced</span>
            <h2>NVIDIA Isaac for Robotics AI</h2>
            <p>
              Perception, navigation, VSLAM, and AI training.
            </p>
            <a href="/docs/nvidia-isaac/intro" className="btn">
              ▶ Start Tutorial
            </a>
          </div>

          {/* CARD 5 */}
          <div className="card">
            <span className="tag advanced">Advanced</span>
            <h2>Vision-Language-Action (VLA)</h2>
            <p>
              Control robots using natural language and LLMs.
            </p>
            <a href="/docs/vla/intro" className="btn">
              ▶ Start Tutorial
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
}
