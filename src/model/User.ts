import { DataTypes, Model, Optional } from 'sequelize'
import { UserAttributes } from '../types/user'
import sequelize from '../config/database'
import { UserRole } from '../types/userRole'
import { Store } from './Store';

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number
  public fullName!: string
  public email!: string
  public phone!: string
  public role!: UserRole
  private password!: string
  public createdAt!: Date
  public updatedAt!: Date
  public lastLogin!: Date
  public store?: Store;

  toJSON() {
    const attributes = { ...this.get() }
    delete attributes.password
    return attributes
  }

  public get getPassword(): string {
    return this.password
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.ROLE_STORE_ADMIN,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
)
