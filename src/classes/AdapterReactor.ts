import stringHash = require("string-hash");

import * as globalConsts from "../consts/GlobalConsts";
import { IAdapterReactor } from "../interfaces/IAdapterReactor";

import { Fa365 } from "../main";
import { ISensorOpen } from "../interfaces/ISensorOpen";
// TODO: temporary disabled
// import { SensorOpen } from "../classes/SensorOpen";
import { SensorsFactory } from "../factories/SensorsFactory";
import { NotificationsIoFactory } from "../factories/NotificationsIoFactory";
import { INotificationsIoFactory } from "../interfaces/factories/INotificationsIoFactory";
import { INotificationIoNotifier } from "../interfaces/INotificationIoNotifier";
// TODO: temporary disabled
// import { NotificationIoNotifier } from "./NotificationIoNotifier";

export class AdapterReactor implements IAdapterReactor {

	/*
	  this.log.info("Z-Wave instance used: " + this.config.zwaveInstanceName);
	  this.log.info("Philips Hue instance used: " + this.config.hueInstanceName);
	*/

	private adapter: unknown;

	private electricityHashes: Set<number>;
	private electricityNames: string[];

	private sensorsOpens: Map<number, ISensorOpen>;

	// private sensorEingangtuer: ISensorOpen;

	protected adapterCurrent: Fa365;

	constructor(paramAdapter: unknown) {
		this.adapter = paramAdapter;
		this.adapterCurrent = (this.adapter) as Fa365;

		this.electricityHashes = new Set();
		this.electricityNames = [];

		// this.sensorEingangtuer = new SensorsFactory().GetSensorOpenAeon(this, "NODE30");
		this.sensorsOpens = new Map<number, ISensorOpen>();
	}

	private addDevices(
		paramNotifier: INotificationIoNotifier
	): void {
		this.addDeviceOpenSensor(
			new SensorsFactory().GetSensorOpenAeon(
				globalConsts.channelWohnungEingangTuerUri,
				this.adapterCurrent.config.zwaveInstanceName,
				"NODE30",
				globalConsts.notificationChannelRoomWohnungEingangTuer,
				paramNotifier
			));
	}
	public async Initialize(): Promise<void> {
		this.addDevices(await this.prepareNotification());

		/*
			Creation of home configuration rooms/devices/channels
		*/
		await this.adapterCurrent.setObjectAsync(globalConsts.hostWettstettenUri, {
			type: "channel",
			common: {
				name: globalConsts.hostWettstettenName
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.roomWohnungEingangUri, {
			type: "channel",
			common: {
				name: globalConsts.roomWohnungEingangName,
				role: globalConsts.roleRoom
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.channelWohnungEingangTuerUri, {
			type: "channel",
			common: {
				name: globalConsts.channelTuerName
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.hauszaehlerUri, {
			type: "device",
			common: {
				name: globalConsts.hauszaehlerName
			},
			native: {},
		});
		// wechselstrom
		await this.adapterCurrent.setObjectAsync(globalConsts.hauszaehlerWechselstromUri, {
			type: "channel",
			common: {
				name: globalConsts.wechselstromName
			},
			native: {},
		});
		await this.adapterCurrent.setObjectAsync(globalConsts.hauptzaehlerWechselstromUri, {
			type: "state",
			common: {
				name: globalConsts.hauptzaehlerName,
				type: "number",
				role: "indicator",
				read: true,
				write: false,
				custom: {
					"sql.0": {
						"enabled": true,
						"changesOnly": true,
						"debounce": "1000",
						"aliasId": "hauszaehler.wechselstrom.hauptzaeler"
					}
				}
			},
			native: {},
		});

		this.adapterCurrent.log.info(`before register`);
		for (const item of this.sensorsOpens.values()) {
			await item.Register(this.adapterCurrent);
		}
		this.adapterCurrent.log.info(`after register`);
	}

	private addDeviceOpenSensor(
		paramSensor: ISensorOpen
	): void {
		this.sensorsOpens.set(paramSensor.SourceEventHash, paramSensor);
		// this.adapterCurrent.subscribeForeignStates(paramSensor.Fqnn);
		// this.adapterCurrent.log.info(`Event: ${paramSensor.Fqnn}`);
	}

	private async subscribeSensorsOpen(): Promise<void> {
		this.adapterCurrent.log.info(`before subscribe`);
		for (const item of this.sensorsOpens.values()) {
			this.adapterCurrent.subscribeForeignStates(item.Fqnn);
			this.adapterCurrent.log.info(`Event: ${item.Fqnn}`);
		}
		this.adapterCurrent.log.info(`after subscribe`);
	}

	private async subscribeWechselstrom(): Promise<void> {
		// garage
		this.electricityNames.push("zwave.0.NODE69.METER.Electric_-_W_1");

		// hobbyraum
		this.electricityNames.push("zwave.0.NODE74.SENSOR_MULTILEVEL.Power_1");

		// kueche
		this.electricityNames.push("zwave.0.NODE33.METER.Electric_-_W_1");

		// datacenter
		this.electricityNames.push("zwave.0.NODE23.SENSOR_MULTILEVEL.Power_1");

		// saugroboter
		this.electricityNames.push("zwave.0.NODE66.SENSOR_MULTILEVEL.Power_1");

		// zwift
		this.electricityNames.push("zwave.0.NODE76.METER.Instance_1:_Electric_-_W_3");

		// zwift/charger
		this.electricityNames.push("zwave.0.NODE76.METER.Instance_1:_Electric_-_W_2");

		// rechner@arbeitszimmer
		this.electricityNames.push("zwave.0.NODE50.METER.Electric_-_W_1");

		// heizung@kinderzimmer
		this.electricityNames.push("zwave.0.NODE64.SENSOR_MULTILEVEL.Power_1");

		// waschmachine@keller
		this.electricityNames.push("zwave.0.NODE8.SENSOR_MULTILEVEL.Power_1");

		// comm@flur
		this.electricityNames.push("zwave.0.NODE65.SENSOR_MULTILEVEL.Power_1");

		for (const item of this.electricityNames) {
			await this.adapterCurrent.subscribeForeignStatesAsync(item);
			this.electricityHashes.add(stringHash(item));
		}
	}

	// TODO: add unit test
	private async getWechselstrom(paramStateName: string): Promise<number> {
		const stateWechselstromCheck =
			await this.adapterCurrent.getForeignStateAsync(paramStateName);
		let stateWechselstrom = 0; // type <number>, no exclusive declaration required
		if (!(stateWechselstromCheck == null)) {
			if (!(stateWechselstromCheck.val == null)) {
				// TODO: required check if source value is real integer value
				stateWechselstrom = parseFloat(stateWechselstromCheck.val.toString())
			}
		}
		else {

		}

		return stateWechselstrom;
	}

	private async getWechselstromTotal(): Promise<number> {
		let currentWechselstrom = 0; // type <number>, no exclusive declaration required

		for (const item of this.electricityNames) {
			currentWechselstrom += await this.getWechselstrom(item);
		}

		currentWechselstrom = (currentWechselstrom * 10) / 10;
		return currentWechselstrom;
	}

	private async prepareNotification(): Promise<INotificationIoNotifier> {
		const notificationsIoFactory: INotificationsIoFactory = new NotificationsIoFactory();
		const notifier: INotificationIoNotifier = notificationsIoFactory.GetNotificationIoNotifier();
		notifier.Channels.add(
			notificationsIoFactory.GetNotificationIoChannelTelegram(
				"", // TODO: add telegram instance
				""  // TODO: add telegram chat instance
			));
		notifier.Channels.add(
			notificationsIoFactory.GetNotificationIoChannelMail(
				"", // TODO: add email instance
				"", // TODO: add address from
				"", // TODO: add address to
				""  // TODO: add key
			));
		return notifier;
	}

	public async Subscribe(): Promise<void> {
		await this.subscribeSensorsOpen();
		await this.subscribeWechselstrom();
	}

	public async onStateChange(
		id: string,
		state: ioBroker.State | null | undefined
	): Promise<void> {
		const hashState: number = stringHash(id);
		if (state) {
			if (this.electricityHashes.has(hashState)) {
				await this.adapterCurrent.setStateAsync(
					globalConsts.hauptzaehlerWechselstromUri,
					{ val: await this.getWechselstromTotal(), ack: true }
				);
			} else {
				if (this.sensorsOpens.has(hashState)) {
					await (this.sensorsOpens.get(hashState))?.Handle(this.adapterCurrent, state);
					this.adapterCurrent.log.info(`Eingangtuer opened`);
				}
			}
		}
	}
}