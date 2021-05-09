import { User } from './User';
import { Asset } from './Asset';

export interface Permission {
    id: string;
    href: string;
    date: Date;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    user: User;
    granter: User;
    privilege: Asset[];
}
