export enum StoreStatusValue {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export class StoreStatus {
  constructor(public value: StoreStatusValue) {}

  static getStoreStatusByValue(value: string): StoreStatus | null {
    switch (value) {
      case StoreStatusValue.ACTIVE:
        return new StoreStatus(StoreStatusValue.ACTIVE);
      case StoreStatusValue.PENDING:
        return new StoreStatus(StoreStatusValue.PENDING);
      case StoreStatusValue.SUSPENDED:
        return new StoreStatus(StoreStatusValue.SUSPENDED);
      default:
        return null;
    }
  }
}