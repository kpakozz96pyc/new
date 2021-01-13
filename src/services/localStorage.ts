import {User} from "../models/user";

export interface ILocalStorageService {
    setUser(user: User): void;

    getUser(): User | null;

    clearAll(): void;
}

export class LocalStorage implements ILocalStorageService {

    private set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private get<T>(key: string): T | null {
        const str = localStorage.getItem(key);
        if (str) return JSON.parse(str) as T;
        else return null
    }

    public getUser(): User|null {
        return this.get<User>('user');
    }

    public setUser(user: User): void {
        this.set('user', user);
    }

    clearAll(): void {
        localStorage.clear();
    }


}