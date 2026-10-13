# Button-Controlled LED Rotation

## Overview

This task implements a button-controlled LED rotation pattern using AVR C on an Arduino Uno. Ten LEDs are connected to the microcontroller, and five consecutive LEDs are turned on at a time.

Each button press shifts the active LED pattern by one position. When the pattern reaches the end of the LED sequence, it wraps around to the beginning.

## Objectives

- Control multiple LEDs using AVR registers.
- Read button input using `PINB`.
- Configure the internal pull-up resistor.
- Use bitwise operations to shift and rotate an LED pattern.
- Implement software button debouncing.

## Hardware Requirements

- Arduino Uno.
- Ten LEDs.
- Current-limiting resistors (220 Ω).
- Push button.
- Breadboard and jumper wires.

## Implementation

The program configures `PORTD` and the lower two bits of `PORTB` as outputs to control the LEDs. The button is connected to Arduino digital pin D10, corresponding to `PB2`, and uses the internal pull-up resistor.

The initial pattern is set to `0x1F`, which activates five consecutive LEDs. When the button is pressed, the program waits 25 ms to debounce the input, then shifts the pattern left by one position. The most significant active position wraps around to the least significant position, keeping the pattern within ten bits.

The program also waits for the button to be released before accepting another press.

## Expected Behavior

- Initially, five consecutive LEDs are turned on.
- Each valid button press shifts the pattern by one position.
- The pattern always contains five consecutive active LEDs.
- The pattern wraps around after reaching the end of the ten-LED sequence.
- Holding the button down does not continuously advance the pattern; another press is required.

## Key Concepts

- **AVR I/O Registers:** `DDRD`, `DDRB`, `PORTD`, `PORTB`, and `PINB`.
- **Internal Pull-up:** Keeps the button input HIGH when the button is not pressed.
- **Bitwise Shifting:** Moves the active LED pattern between positions.
- **Circular Rotation:** Wraps the pattern around within ten bits using `0x3FF`.
- **Debouncing:** Uses a 25 ms delay to reduce false button detections.

## Circuit Diagram

[Task 2 - Button-Controlled LED Rotation](./Magnificent%20Hillar-Kieran.pdf)
