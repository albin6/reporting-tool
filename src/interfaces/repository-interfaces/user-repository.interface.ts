import { User } from '../../models/user.model';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
