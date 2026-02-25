// @ts-nochec
import BooleanLight from "@/components/BooleanLight.js";
import { useBluetoothDevice } from "@/lib/useBluetoothDevice.js";
import { Alert, Button } from "@mui/material";
import { useEffect } from "react";
import ControlPanel from "./ControlPanel.js";

const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase(); // UART service UUID
/** the device's receive characteristic id */
const CHARACTERISTIC_UUID_RX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase();
/** the device's transmit characteristic id */
const CHARACTERISTIC_UUID_TX = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase();

export default function App() {
    const BLE = useBluetoothDevice(SERVICE_UUID, [CHARACTERISTIC_UUID_RX, CHARACTERISTIC_UUID_TX]);
    const connected = !BLE.isConnecting && !!BLE.device && !BLE.connectError;
    const [rx, tx] = BLE.characteristics;
    useEffect(() => {}, [BLE.device]);
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Button variant="outlined" onClick={BLE.connect}>
                                Connect to device
                            </Button>
                        </td>
                        <td>
                            {" "}
                            <BooleanLight
                                text={
                                    connected && BLE.device
                                        ? BLE.isConnecting
                                            ? "Connecting..."
                                            : "Connected" + (BLE.device.name ? ": " + BLE.device.name : "")
                                        : "Disconnected"
                                }
                                state={BLE.isConnecting ? "inter" : connected ? "good" : "bad"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>{BLE.connectError ? <Alert severity="warning">{BLE.connectError}</Alert> : null}</td>
                    </tr>
                </tbody>
            </table>
            <ControlPanel
                allGood={connected}
                // assume device and tx are non-null due to all interactions being disabled if either is null
                device={BLE.device}
                tx={rx}
                rx={tx}
            />
        </div>
    );
}

function encodeText(str: string) {
    return new Uint8Array(str.split("").map((e) => e.charCodeAt(0)));
}

export function sendText(char: BluetoothRemoteGATTCharacteristic, str: string) {
    if (!str) {
        console.trace();
    }
    console.log("sending: %o", str);
    if (!char) {
        console.error("no characteristic");
        return;
    }
    char.writeValue(encodeText(str)).catch((e) => console.error("couldn't send message", e));
}
