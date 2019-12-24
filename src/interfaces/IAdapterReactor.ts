export interface IAdapterReactor {
	readonly Adapter: unknown;

	Initialize(): Promise<void>;
	Subscribe(): Promise<void>;

	onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void>;
}
