export interface IAdapterReactor {
    readonly Adapter: unknown;
    
    onStateChange(id: string, state: ioBroker.State | null | undefined): void;
    Subscribe(): void;
}
