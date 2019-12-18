export interface IAdapterReactor {
    readonly Adapter: unknown;

	Initialize(): Promise<void>;
    Subscribe(): void;

    onStateChange(id: string, state: ioBroker.State | null | undefined): void;
}
