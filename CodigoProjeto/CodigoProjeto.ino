#include "Ultrasonic.h" //biblioteca


const int PINO_TRIGGER = 13;
const int PINO_ECHO = 12;

const float height = 10.0;//medição
const float length = 20.0;
const float width = 20.0; 

HC_SR04 sensor(PINO_TRIGGER, PINO_ECHO);

void setup() {
  Serial.begin(9600); 

}

void loop() { // cálculo // tratamento  
  float distanciaSensor = sensor.distance();
  if(distanciaSensor >= 0) { 
  float fluidLevel = height - distanciaSensor; 
  float volumeCm3 = length*width*fluidLevel; 
  float volumeLitros = volumeCm3 / 1000.0; 
    if(volumeLitros >= 0) {
          Serial.print("Nível máximo:");
          Serial.print(4); 
          Serial.print(" ");
          Serial.print("Volume:"); 
          Serial.print(volumeLitros);
          Serial.print(" ");
          Serial.print("Nível mínimo:");
          Serial.println(2.5);
    } 
  }

  delay(1000); 

}

