module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
      tableName: 'account'
    });  
    return Account;
  };