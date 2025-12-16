import { User } from "../model/User";
import { StoreStatusValue } from "./storeStatus";

export interface StoreAttributes {
    id: number;
    brand: string;
    storeAdminId: number;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    storeType?: string;
    storeStatus: StoreStatusValue;
    address?: string;
    phone?: string;
    email?: string;
    storeAdmin?: User;
}