# IoT Laboratory

This directory contains the practical laboratory assignments for the **CSE3 IoT course**. Each lab focuses on specific concepts through hands-on implementation, circuit design, and software development.

## Labs Overview

### Lab 01 — ESP8266 Lamp Control System

An IoT-based lamp control system that combines an ESP8266 microcontroller, a Node.js backend, and a web dashboard.

**Topics covered:**

- Node.js and Express.js backend development.
- Real-time communication using WebSockets.
- Web dashboard development with HTML, CSS, and JavaScript.
- ESP8266 Wi-Fi connectivity and LED brightness control.
- System architecture, implementation, and technical documentation.

[View Lab 01](./lab-01/README.md)

### Lab 02 — AVR I/O and LED Control

Practical exercises using AVR C to control LEDs and read button input through microcontroller I/O registers.

**Tasks:**

- **Task 01 — Sequential LED Rotation:** Sequentially activates eight LEDs using `PORTD`, with a 250 ms delay between transitions.
- **Task 02 — Button-Controlled LED Rotation:** Uses a push button to shift a pattern of five active LEDs across ten LED outputs, including circular rotation and software debouncing.

**Topics covered:**

- AVR I/O registers and GPIO configuration.
- Bitwise operations and LED pattern control.
- Push-button input and internal pull-up resistors.
- Timing and software debouncing.

[View Lab 02 - Task 01](./lab-02/task-01/README.md)
[View Lab 02 - Task 02](./lab-02/task-02/README.md)

## Repository Structure

```text
labs/
├── README.md
├── lab-01/
│   └── README.md
└── lab-02/
    └── README.md
```

Each lab directory contains its own implementation files, supporting assets, and documentation as required.
