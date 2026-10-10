#define F_CPU 16000000UL

#include <avr/io.h>
#include <util/delay.h>
#include <stdint.h>

#define BUTTON PB2  // Arduino D10

int main(void)
{
    DDRD = 0xFF;             // D0-D7 outputs
    DDRB |= 0x03;            // D8-D9 outputs

    DDRB &= ~(1 << BUTTON);  // D10 input
    PORTB |= (1 << BUTTON);  // Internal pull-up

    uint16_t pattern = 0x1F; // Five LEDs initially ON

    while (1) {
        PORTD = (uint8_t)pattern;
        PORTB = (PORTB & ~0x03) | ((pattern >> 8) & 0x03);

        if (!(PINB & (1 << BUTTON))) {
            _delay_ms(25);   // Debounce

            if (!(PINB & (1 << BUTTON))) {
                pattern = ((pattern << 1) & 0x3FF) |
          ((pattern >> 9) & 1);

                while (!(PINB & (1 << BUTTON))) {
                    // Wait for button release
                }
            }
        }
    }
}

