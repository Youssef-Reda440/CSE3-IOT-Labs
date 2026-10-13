# ESP8266 Lamp Control System

## Overview

This project implements an IoT-based lamp control system using an ESP8266 microcontroller and a web dashboard. The system allows users to control the lamp remotely through a browser interface while communicating with a Node.js backend over WebSockets.

The backend manages the lamp state and brightness, then broadcasts state updates to connected clients. The ESP8266 receives these updates and controls its built-in LED accordingly.

## Features

- Web-based dashboard for lamp control.
- Turn the lamp on and off remotely.
- Adjust lamp brightness through a slider.
- Real-time communication using WebSockets.
- Broadcast lamp state and brightness updates to connected clients.
- Wi-Fi connectivity and automatic WebSocket reconnection on the ESP8266.
- ESP8266 built-in LED control using PWM.

## System Architecture

The system consists of three main components:

1. **Web Dashboard:** Provides the user interface for power and brightness controls.
2. **Node.js Backend:** Serves the dashboard, processes WebSocket commands, maintains the lamp state, and broadcasts updates.
3. **ESP8266 Controller:** Connects to Wi-Fi, receives lamp state updates, and controls the built-in LED.

### Communication Flow

- The dashboard sends JSON commands to the backend through WebSockets.
- The backend updates the lamp state and broadcasts the current status and brightness.
- The ESP8266 processes the received state and adjusts the LED output.

> **Note:** The backend maintains the application state in memory. It does not receive explicit confirmation that the physical LED has reached the requested state.

## Technologies Used

| Technology               | Purpose                             |
| ------------------------ | ----------------------------------- |
| Node.js                  | Backend runtime                     |
| Express.js               | HTTP server and static file serving |
| WebSocket (`ws`)         | Real-time communication             |
| HTML, CSS, JavaScript    | Web dashboard                       |
| ESP8266                  | IoT controller                      |
| ArduinoJson              | JSON message parsing in firmware    |
| ESP8266WiFi              | Wi-Fi connectivity                  |
| WebSocketsClient_Generic | WebSocket client on the ESP8266     |

## Hardware Requirements

- ESP8266 development board.
- Wi-Fi network.
- Computer for running the backend and accessing the dashboard.

The project uses the ESP8266 board's built-in LED, so an external lamp or LED circuit is not required for the current implementation.

## Project Structure

```text
lab-01/
├── assets/
│   ├── dashboard.png
│   └── websocket_connection.png
│
├── esp/
│   └── sketch_oct8a.ino
│
├── server/
│   └── server.js
│
├── services/
│   └── lampService.js
│
├── views/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── dashboard.js
│   └── index.html
│
├── websocket/
│   └── websocket.js
│
├── report/
│   ├── report.tex
│   └── report.pdf
│
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### Directory and File Description

| Path                | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `assets/`           | Stores screenshots used to document the project.                  |
| `esp/`              | Contains the ESP8266 Arduino firmware.                            |
| `server/`           | Configures the Express.js application and HTTP routes.            |
| `services/`         | Manages the lamp state and control functions.                     |
| `views/`            | Contains the web dashboard, stylesheets, and frontend JavaScript. |
| `websocket/`        | Handles WebSocket messages and broadcasts lamp state updates.     |
| `report/`           | Contains the LaTeX report source and compiled PDF.                |
| `index.js`          | Initializes the HTTP server and attaches the WebSocket server.    |
| `package.json`      | Defines the Node.js project metadata and dependencies.            |
| `package-lock.json` | Records the resolved npm dependency versions.                     |
| `README.md`         | Provides project documentation and setup instructions.            |

## Installation and Setup

### 1. Prerequisites

Install the following tools:

- Node.js and npm.
- Arduino IDE or a compatible Arduino development environment.
- ESP8266 board support and the required firmware libraries.

### 2. Clone the Repository and Install Backend Dependencies

Open a terminal and run:

```bash
git clone https://github.com/Youssef-Reda440/CSE3-IOT-Labs.git
cd CSE3-IOT-Labs/labs/lab-01
npm install
```

The `npm install` command installs the dependencies defined in `package.json`.

### 3. Configure the ESP8266

Open `esp/sketch_oct8a.ino` and update the configuration constants:

```cpp
constexpr char WIFI_SSID[] = "SSID";
constexpr char WIFI_PASSWORD[] = "PASSWORD";

constexpr char SERVER[] = "SERVER_ADDRESS";
constexpr uint16_t SERVER_PORT = 2000;
```

Replace the placeholders with your Wi-Fi credentials and the IP address of the computer running the backend.

Ensure that the ESP8266 and the backend host can communicate over the same network, and allow incoming connections on port `2000` if required.

### 4. Start the Backend

From the `lab-01` directory, run:

```bash
npm run dev
```

The server listens on port `2000`.

### 5. Upload the Firmware

1. Open `esp/sketch_oct8a.ino` in the Arduino IDE.
2. Select the appropriate ESP8266 board and serial port.
3. Install the required libraries if they are not already available.
4. Upload the firmware to the ESP8266.
5. Open the Serial Monitor to inspect Wi-Fi and WebSocket connection messages.

### 6. Open the Dashboard

Navigate to the backend host in a browser:

```text
http://localhost:2000
```

If accessing the dashboard from another device, replace `localhost` with the backend host's IP address.

## Usage

- **Power Control:** Use the dashboard button to switch the lamp on or off.
- **Brightness Control:** Adjust the slider to change the LED brightness.
- **Connection Status:** The dashboard displays whether its WebSocket connection is connected or disconnected.
- **Firmware Logs:** Use the Serial Monitor to observe Wi-Fi and WebSocket events.

When the dashboard establishes a WebSocket connection, it automatically sends an ON command at full brightness.

## Testing and Results

The system can be evaluated by checking:

- Backend availability and dashboard loading.
- WebSocket connection establishment.
- Lamp ON and OFF commands.
- Brightness adjustment.
- LED response and dashboard state updates.

Add screenshots of the actual dashboard and observed hardware behavior to document the results. Only report outcomes that have been verified during testing.

## Project Report

The detailed academic report is available in the `report/` directory.

- [View the LaTeX report source](report/report.tex)

If a compiled PDF is included in the repository, link it here as well.

## Limitations

- Lamp state is stored in backend memory and is not persisted after a backend restart.
- The current implementation controls the ESP8266 built-in LED rather than a mains-powered lamp.
- The backend does not receive hardware-level confirmation of the LED state.
- Network access and valid Wi-Fi configuration are required for remote control.

## Future Improvements

- Add input validation and error handling for incoming WebSocket commands.
- Validate brightness values before applying them.
- Add explicit device acknowledgments and connection-state synchronization.
- Persist lamp state where required.
- Add authentication and secure communication for deployments beyond a trusted local network.

## Author

**Youssef Reda**

Computer and Systems Engineering Program  
Faculty of Engineering, Zagazig University
