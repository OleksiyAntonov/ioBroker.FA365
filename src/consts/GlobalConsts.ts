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

export const hostWettstettenName: string = "wettstetten";
export const roomWohnungEingangName: string = "eingangWohnung";
export const channelTuerName: string = "tuer";
export const stateOpenedName: string = "open";

export const hostWettstettenUri: string = hostWettstettenName;
export const roomWohnungEingangUri: string = `${hostWettstettenUri}.${roomWohnungEingangName}`;
export const channelWohnungEingangTuerUri: string = `${roomWohnungEingangUri}.${channelTuerName}`;
export const channelWohnungEingangTuerStateOpenedUri: string = `${channelWohnungEingangTuerUri}.${stateOpenedName}`;

export const hauszaehlerName: string = "hauszaehler";
export const wechselstromName: string = "wechselstrom";
export const hauptzaehlerName: string = "hauptzaehler";

export const hauszaehlerUri: string = `${hostWettstettenUri}.${hauszaehlerName}`;
export const hauszaehlerWechselstromUri: string = `${hauszaehlerUri}.${wechselstromName}`;
export const hauptzaehlerWechselstromUri: string = `${hauszaehlerWechselstromUri}.${hauptzaehlerName}`;
