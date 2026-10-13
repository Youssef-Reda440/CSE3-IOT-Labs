# Sequential LED Rotation

## Overview

This task implements a sequential LED rotation pattern using AVR C. Eight LEDs are connected to the microcontroller's `PORTD` pins, and the program turns on one LED at a time, moving from right to left across the output pins.

Each LED remains on for 0.25 seconds before the next LED is activated. After the eighth LED, the sequence restarts from the first LED.

## Objectives

- Configure `PORTD` as an output port.
- Control eight LEDs using bitwise operations.
- Implement a sequential LED rotation pattern.
- Apply a 250 ms delay between LED transitions.

## Hardware Requirements

- AVR microcontroller or compatible development board.
- Eight LEDs.
- Current-limiting resistors.
- Breadboard and jumper wires, if using external LEDs.

## Implementation

The program configures all pins of `PORTD` as outputs using `DDRD = 0xFF`.

A `for` loop iterates through bit positions 0 to 7. The expression `(1 << i)` activates one bit at a time and writes the result to `PORTD`. A 250 ms delay controls the transition interval between LEDs.

## Expected Behavior

- Only one LED is turned on at a time.
- The active LED moves sequentially across the eight output pins.
- Each step has a delay of 250 ms.
- After reaching the last LED, the sequence repeats.
