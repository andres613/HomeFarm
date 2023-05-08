int READER = 0;
String valueToReturn = "";

const int LED = 4;

const int LIGTH = 3;
int lapseOfTime = 6400;   // Variable del tiempo de disparo Dimmer

const int LDRPin = A0;
const int LDR_LIGTH = 6;
int LDRPinValue = 0;
const long A = 1000;     //Resistencia en oscuridad en KΩ
const int B = 15;        //Resistencia a la luz (10 Lux) en KΩ
const int Rc = 10;       //Resistencia calibracion en KΩ
int ilum;

float temperature, LM35PinMillivoltsValue;
const int LM35Pin = A1;
int LM35PinValue = 0;
const int BUZZER = 5;
const int fanPin = 7;

int PWM_LED;

void setup() {
  Serial.begin(9600); // abre el puerto serie
  while (!Serial) {
    ; // wait for serial port to connect.
  }
  
  pinMode(LED, OUTPUT);
  pinMode(LDR_LIGTH, OUTPUT);
  pinMode(LIGTH, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(LM35Pin, INPUT);
  digitalWrite(LED, LOW);
  pinMode(fanPin, OUTPUT);
  attachInterrupt(0, zeroCrossing, RISING);  // Interrupcion 0 (pin2) 
}                                         // LOW, CHANGE, RISING, FALLING

void loop() {
  if (Serial.available() > 0) {
    READER = Serial.read();
    
    if (READER != -1) {  // -1 means no data is available
      if (READER == 'q') {
        digitalWrite(LED, HIGH);
      }
      if (READER == 'w') {
        digitalWrite(LED, LOW);
      }
      
      if(READER == 'a') lapseOfTime = 6400;
      if(READER == 'b') lapseOfTime = 5300;
      if(READER == 'c') lapseOfTime = 5100;
      if(READER == 'd') lapseOfTime = 4900;
      if(READER == 'e') lapseOfTime = 4500;
      if(READER == 'f') lapseOfTime = 4100;
      if(READER == 'g') lapseOfTime = 3500;
      if(READER == 'h') lapseOfTime = 3000;
      if(READER == 'i') lapseOfTime = 1000;
      if(READER == 'j') lapseOfTime = 0;
    }
  }
  
  LM35PinValue = analogRead(LM35Pin);
  LM35PinValue = analogRead(LM35Pin);  // Evita inestabilidad al combinar LM35 y LDR
  LM35PinMillivoltsValue = (LM35PinValue / 1023.0) * 5000;
  temperature = LM35PinMillivoltsValue / 10; 
  
  LDRPinValue = analogRead(LDRPin);
  LDRPinValue = analogRead(LDRPin);  // Evita nestabilidad al combinar LM35 y LDR
  // ilum = ((long)(1024-LDRPinValue)*A*10)/((long)B*Rc*LDRPinValue);  //usar si LDR entre GND y A0
  ilum = ((long)LDRPinValue*A*10)/((long)B*Rc*(1024-LDRPinValue));  //usar si LDR entre A0 y Vcc
  
  // PWM_LED = map(LDRPinValue, 0, 1023, 255, 0);
  // analogWrite(LDR_LIGTH, PWM_LED);

  if(temperature >= 28) {
    digitalWrite(BUZZER, HIGH);
    delay(300);
    digitalWrite(BUZZER, LOW);
    delay(300);
    digitalWrite(fanPin, HIGH);
  } else {
    digitalWrite(fanPin, LOW);
  }
  
  if(ilum <= 100) {
    digitalWrite(LDR_LIGTH, HIGH);
  } else {
    digitalWrite(LDR_LIGTH, LOW);
  }

  valueToReturn = String("{\"ilumination\":") + String(ilum) + String(",\"temperature\":") + String(temperature) + String("}");
  Serial.print(valueToReturn + "\n");

  delay(1000);
}

void zeroCrossing() {   // Funcion que se ejecuta durante cada interrupion
  delayMicroseconds(lapseOfTime);
  digitalWrite(LIGTH, HIGH);
  delayMicroseconds(100);
  digitalWrite(LIGTH, LOW);
}
