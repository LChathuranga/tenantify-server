import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { StoreAttributes } from '../types/store';
import { StoreStatusValue } from '../types/storeStatus';

export interface StoreCreationAttributes extends Optional<StoreAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Store extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
  public id!: number;
  public brand!: string;
  public storeAdminId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public description?: string;
  public storeType?: string;
  public storeStatus!: StoreStatusValue
  public address?: string;
  public phone?: string;
  public email?: string;
  public storeAdmin?: User;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      unique: true, // One-to-one
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storeStatus: {
      type: DataTypes.ENUM(...Object.values(StoreStatusValue)),
      allowNull: false,
      defaultValue: StoreStatusValue.ACTIVE,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'invalid email format',
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Store',
    tableName: 'stores',
    timestamps: true,
    hooks: {
      beforeCreate: (store: Store) => {
        store.storeStatus = StoreStatusValue.PENDING;
      },
    },
  }
);

