#include <ESP8266WiFi.h>
#include <WebSocketsClient_Generic.h>
#include <ArduinoJson.h>

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

constexpr char WIFI_SSID[] = "Loly";
constexpr char WIFI_PASSWORD[] = "msi01016701";

constexpr char SERVER[] = "192.168.1.32";
constexpr uint16_t SERVER_PORT = 2000;
constexpr char SERVER_PATH[] = "/";

constexpr uint8_t LED_PIN = LED_BUILTIN;


// ─────────────────────────────────────────────
// WebSocket
// ─────────────────────────────────────────────

WebSocketsClient webSocket;


// ─────────────────────────────────────────────
// Command execution
// ─────────────────────────────────────────────

void executeCommand(JsonDocument& json)
{
    const char* status = json["status"];
    int brightness = json["brightness"] | 0;

    if (status == nullptr) {
        Serial.println("Warning: Received JSON without a 'status' field.");
        return;
    }

    Serial.print("Executing status: ");
    Serial.print(status);
    Serial.print(" | brightness: ");
    Serial.println(brightness);

    if (strcmp(status, "on") == 0)
    {
        // LED_BUILTIN is usually active-low on ESP8266, so 255 - brightness works perfectly
        analogWrite(LED_PIN, 255 - brightness);
        Serial.println("LED updated (ON)");
    }
    else if (strcmp(status, "off") == 0)
    {
        analogWrite(LED_PIN, 255);
        Serial.println("LED turned OFF");
    }
}


// ─────────────────────────────────────────────
// JSON message
// ─────────────────────────────────────────────

void handleMessage(uint8_t* payload, size_t length)
{
    Serial.print("Received raw payload: ");
    for(size_t i = 0; i < length; i++) {
        Serial.print((char)payload[i]);
    }
    Serial.println();

    JsonDocument json;

    DeserializationError error =
        deserializeJson(json, payload, length);

    if (error)
    {
        Serial.print("Invalid JSON: ");
        Serial.println(error.c_str());
        return;
    }

    executeCommand(json);
}


// ─────────────────────────────────────────────
// WebSocket events
// ─────────────────────────────────────────────

void onWebSocketEvent(
    WStype_t type,
    uint8_t* payload,
    size_t length)
{
    switch (type)
    {
        case WStype_CONNECTED:
            Serial.print("[WSc] Connected to url: ");
            Serial.println((char*)payload);
            break;

        case WStype_DISCONNECTED:
            Serial.println("[WSc] Disconnected from server.");
            break;

        case WStype_TEXT:
            Serial.println("[WSc] Received TEXT message.");
            handleMessage(payload, length);
            break;
            
        case WStype_ERROR:
            Serial.println("[WSc] Error occurred!");
            break;

        default:
            Serial.print("[WSc] Unhandled event type: ");
            Serial.println(type);
            break;
    }
}


// ─────────────────────────────────────────────
// Setup
// ─────────────────────────────────────────────

void setup()
{
    Serial.begin(921600);

    pinMode(LED_PIN, OUTPUT);

    // LED off
    analogWrite(LED_PIN, 255);

    // Wi-Fi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.print("Connecting to Wi-Fi");

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(250);
        Serial.print(".");
    }

    Serial.println();

    Serial.print("Wi-Fi connected. IP: ");
    Serial.println(WiFi.localIP());

    // WebSocket
    webSocket.begin(
        SERVER,
        SERVER_PORT,
        SERVER_PATH
    );

    webSocket.onEvent(onWebSocketEvent);
    webSocket.setReconnectInterval(5000);

    Serial.println("WebSocket client started.");
}


// ─────────────────────────────────────────────
// Main loop
// ─────────────────────────────────────────────

void loop()
{
    webSocket.loop();
}