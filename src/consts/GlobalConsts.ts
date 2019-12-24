// constants
export const numUndefined: number = -1;
export const numZero: number = 0;
export const stringEmpty: string = "";
export const valueUndefined: string = "Undefined";

// list of initiators
export const enum initiators {
    eingangTuer = 1,
    balkonTuer = 2,
    postBox = 3
}

export const initiatorsNames: Array<string> = [
    "Eingangtuer",
    "Balkontuer",
    "postBox"
];

export const roleRoom: string = "room";

export const roomWohnungEingang: string = "eingangWohnung";

export const deviceSensorOpen: string = "sensoroffnen";
export const deviceChannelSensorOpenWohnungEingang: string = `${deviceSensorOpen}.${roomWohnungEingang}`;
