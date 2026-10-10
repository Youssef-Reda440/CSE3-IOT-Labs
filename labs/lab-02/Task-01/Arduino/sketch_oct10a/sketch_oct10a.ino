#include <avr/io.h>
#include <util/delay.h>
void setup() {
  DDRD = 0xFF;
}

void loop() {
  for(int i = 0;i<8;i++){
    PORTD = (1 << i);
    _delay_ms(250);
  }
}
