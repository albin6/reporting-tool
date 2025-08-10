export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string | number): Promise<T | null>;
    create(item: T): Promise<T>;
    update(id: string | number, item: Partial<T>): Promise<T | null>;
    delete(id: string | number): Promise<boolean>;
}
