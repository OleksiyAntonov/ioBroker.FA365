export interface IAdapterReactor {
	Initialize(): Promise<void>;
	Subscribe(): Promise<void>;

	onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void>;
}
