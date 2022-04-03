// constants
export const numUndefined = -1;
export const numZero = 0;
export const stringEmpty = "";
export const valueUndefined = "Undefined";

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

export const roleRoom = "room";

export const hostWettstettenName = "wettstetten";
export const roomWohnungEingangName = "eingangWohnung";
export const channelTuerName = "tuer";
export const stateOpenedName = "open";
export const stateOpenedTextName = "opentext";

export const hostWettstettenUri: string = hostWettstettenName;
export const roomWohnungEingangUri = `${hostWettstettenUri}.${roomWohnungEingangName}`;
export const channelWohnungEingangTuerUri = `${roomWohnungEingangUri}.${channelTuerName}`;
// export const channelWohnungEingangTuerStateOpenedUri: string = `${channelWohnungEingangTuerUri}.${stateOpenedName}`;

export const hauszaehlerName = "hauszaehler";
export const wechselstromName = "wechselstrom";
export const hauptzaehlerName = "hauptzaehler";

export const hauszaehlerUri = `${hostWettstettenUri}.${hauszaehlerName}`;
export const hauszaehlerWechselstromUri = `${hauszaehlerUri}.${wechselstromName}`;
export const hauptzaehlerWechselstromUri = `${hauszaehlerWechselstromUri}.${hauptzaehlerName}`;

// statuses
export const sensorStatusOpened = true;
export const sensorStatusClosed = false;

export const sensorStatusOpenedText = "Offnen";
export const sensorStatusClosedText = "Zu";

export const notificationChannelRoomWohnungEingangTuer = "Eingangtuer";
