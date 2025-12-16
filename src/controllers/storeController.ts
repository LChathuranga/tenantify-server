import { StoreCreationAttributes } from "../model/Store";
import { NextFunction, Request, Response } from "express";
import * as storeService from "../services/storeService";
import { StoreStatus } from "../types/storeStatus";

export const createStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const storeData: StoreCreationAttributes = req.body;
        const user = req.user!
        const newStore = await storeService.createStore(storeData, user);
        res.status(201).json(newStore);
    } catch (error) {
        next(error);
    }
}

export const getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const storeId = parseInt(req.params.id, 10);
        const store = await storeService.getStoreById(storeId);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
}

export const getAllStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
}

export const getStoreByAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user!
        const store = await storeService.getStoreByAdmin(user.id);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
}

export const getStoreByEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user!
        const store = await storeService.getStoreByEmployee(user.id);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
}

export const updateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user!
        const store = await storeService.updateStore(user.id, parseInt(req.params.id, 10), req.body);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
}

export const deleteStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user!
        await storeService.deleteStore(user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export const moderateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const storeId = parseInt(req.params.id, 10);
        const status = StoreStatus.getStoreStatusByValue(req.body.status)!;
        const store = await storeService.moderateStore(storeId, status);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
}