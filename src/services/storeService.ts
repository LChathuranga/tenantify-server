import { NotFoundError } from "../errors/NotFoundError";
import { PermissionDenied } from "../errors/PermissionDenied";
import { Store, StoreCreationAttributes } from "../model/Store";
import { User } from "../model/User";
import { StoreStatus } from "../types/storeStatus";
import { getCurrentUser } from "./userService";

export const createStore = async (storeData: Partial<StoreCreationAttributes>, user: User): Promise<Store> => {
    storeData.storeAdminId = user.id;
    if (!storeData.brand || !storeData.description || !storeData.storeType || !storeData.address || !storeData.phone || !storeData.email) {
        throw new Error("Missing required store fields");
    }
    return await Store.create(storeData as StoreCreationAttributes);
}

export const getStoreById = async (storeId: number): Promise<Store | null> => {
    const store = await Store.findByPk(storeId, {
        include: [
            {
                model: User,
                as: 'storeAdmin',
                attributes: { exclude: ['password'] }
            }
        ]
    });

    if (!store) {
        throw new NotFoundError(`Store with id ${storeId} not found`);
    }

    return store;
}

export const getAllStores = async (): Promise<Store[]> => {
    return await Store.findAll();
}

export const getStoreByAdmin = async (adminId: number): Promise<Store | null> => {
    const admin = await getCurrentUser(adminId);
    const store = await Store.findOne({ where: { storeAdminId: admin.id } });
    return store;
}

export const getStoreByEmployee = async (employeeId: number): Promise<Store | null> => {
    const employee = await getCurrentUser(employeeId);

    if (!employee) {
        throw new PermissionDenied('You do not have permission to access this store');
    }
    return await Store.findOne({ where: { storeAdminId: employee.id } });
}

export const updateStore = async (userId: number, storeId: number, updateData: Partial<Store>): Promise<Store> => {
    const currentUser = await getCurrentUser(userId);
    const existingStore = await getStoreByAdmin(currentUser.id);

    if (!existingStore || existingStore.id !== storeId) {
        throw new PermissionDenied('You do not have permission to update this store');
    }
    existingStore.brand = updateData.brand || existingStore.brand;
    existingStore.description = updateData.description || existingStore.description;
    existingStore.storeType = updateData.storeType || existingStore.storeType;
    existingStore.address = updateData.address || existingStore.address;
    existingStore.phone = updateData.phone || existingStore.phone;
    existingStore.email = updateData.email || existingStore.email;

    await existingStore.save();
    return existingStore;
}

export const deleteStore = async (userId: number): Promise<void> => {
    const currentUser = await getCurrentUser(userId);
    const existingStore = await getStoreByAdmin(currentUser.id);

    if (!existingStore) {
        throw new NotFoundError('Store not found');
    }

    await existingStore.destroy();
}

export const moderateStore = async (id: number, status: StoreStatus) => {
    const store = await getStoreById(id);
    if (!store) {
        throw new NotFoundError(`Store with id ${id} not found`);
    }

    store.storeStatus = status.value;
    await store.save();
    return store;
}