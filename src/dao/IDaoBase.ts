export interface IDaoBase<T> {
    create(item: T): Promise<void>;
    read(id: number): Promise<T | null>;
    update(item: T): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<T[]>;

}