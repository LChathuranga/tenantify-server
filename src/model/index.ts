import { Store } from './Store';
import { User } from './User';

Store.belongsTo(User, { as: 'storeAdmin', foreignKey: 'storeAdminId', onDelete: 'CASCADE' });
User.hasOne(Store, { as: 'store', foreignKey: 'storeAdminId' });

export { Store, User };