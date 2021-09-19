#define BAUD_RATE 9600

// #define LED_RED 9
// #define LED_GREEN 10
// #define LED_BLUE 11

uint8_t rgb[3];

void setup() {
  // pinMode(LED_RED, OUTPUT);
  // pinMode(LED_GREEN, OUTPUT);
  // pinMode(LED_BLUE, OUTPUT);
  Serial.begin(BAUD_RATE);
  Serial.println("READY");
}

void loop() {
  if (Serial.available()) {
    size_t n = Serial.readBytesUntil('\n', rgb, sizeof(rgb));
    if (n >= 3) {
      Serial.println("Rev: " + String(rgb[0]) + ", " + String(rgb[1]) + ", " +
                     String(rgb[2]));
      // analogWrite(LED_RED, rgb[0]);
      // analogWrite(LED_GREEN, rgb[1]);
      // analogWrite(LED_BLUE, rgb[2]);
    }
  } else {
    delay(100);
  }
}
