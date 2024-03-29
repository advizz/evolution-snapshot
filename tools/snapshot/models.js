const Sequelize = require('sequelize')

let   db = {},
      modelConfig = {timestamps: false, ignoreDuplicates: true}

db.Wallets = mysql.define("wallet", {
  address: {
    type:             Sequelize.STRING(256),
    primaryKey:       true
  },
  eos_key:            Sequelize.STRING(256),
  balance_wallet:     Sequelize.DECIMAL(15,4),
  balance_unclaimed:  Sequelize.DECIMAL(15,4),
  balance_reclaimed:  Sequelize.DECIMAL(15,4),
  balance_total:      Sequelize.DECIMAL(15,4),
  registered:         Sequelize.BOOLEAN,
  fallback:           Sequelize.BOOLEAN,
  register_error:     Sequelize.STRING(256),
  fallback_error:     Sequelize.STRING(256),
  valid:              Sequelize.BOOLEAN,
  timestamp:          Sequelize.DATE(),
}, {updateOnDuplicate: true, timestamps: false})

db.Transfers = mysql.define('transfer', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  tx_hash:            Sequelize.STRING(256),
  block_number:       Sequelize.STRING(256),
  from:               Sequelize.STRING(256),
  to:                 Sequelize.STRING(256),
  eos_amount:         Sequelize.DECIMAL(65,0),
  timestamp:          Sequelize.DATE()
}, modelConfig)

db.Buys = mysql.define('buy', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  tx_hash:            Sequelize.STRING(256),
  block_number:       Sequelize.STRING(256),
  address:            Sequelize.STRING(256),
  period:             Sequelize.INTEGER,
  eth_amount:         Sequelize.DECIMAL(65,0),
  timestamp:          Sequelize.DATE()
}, modelConfig)

db.Claims = mysql.define('claim', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  tx_hash:            Sequelize.STRING,
  block_number:       Sequelize.STRING(256),
  address:            Sequelize.STRING(256),
  period:             Sequelize.INTEGER,
  eos_amount:         Sequelize.DECIMAL(65,0),
  timestamp:          Sequelize.DATE()
}, modelConfig)

db.Reclaimables = mysql.define('reclaimable', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  tx_hash:            Sequelize.STRING(256),
  block_number:       Sequelize.STRING(256),
  address:            Sequelize.STRING(256),
  eos_amount:         Sequelize.DECIMAL(65,0),
  timestamp:          Sequelize.DATE()
}, modelConfig)

db.Registrations = mysql.define('registration', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  tx_hash:            Sequelize.STRING(256),
  block_number:       Sequelize.STRING(256),
  address:            Sequelize.STRING(256),
  eos_key:            Sequelize.STRING(256),
  timestamp:          Sequelize.DATE()
}, modelConfig)

// Stores state variables (used infrequently)
db.State = mysql.define('state', {
  id: {
    type:             Sequelize.INTEGER,
    primaryKey:       true
  },
  meta_key:           Sequelize.STRING(256),
  meta_value:         Sequelize.STRING(4294967295) //longtext
}, {
  updateOnDuplicate:  true,
  timestamps:         false,
  freezeTableName:    true,
  tableName:          'state'
})

//Table used to store Snapshot before export to CSV
db.Snapshot = mysql.define('snapshot', {
  user:               Sequelize.STRING(256),
  key:                Sequelize.STRING(256),
  balance:            Sequelize.DECIMAL(15,4),
  timestamp:          Sequelize.DATE()
}, {timestamps: false, freezeTableName: true, tableName: 'snapshot'})

db.SnapshotUnregistered = mysql.define('snapshot_unregistered', {
  user:               Sequelize.STRING(256),
  balance:            Sequelize.DECIMAL(15,4)
}, {timestamps: false, freezeTableName: true, tableName: 'snapshot_unregistered'})

//Public Key Cache
db.Keys = mysql.define('keys', {
  address:            Sequelize.STRING(256),
  tx_hash:            Sequelize.STRING(256),
  public_key:         Sequelize.STRING(256),
  derived_eos_key:    Sequelize.STRING(256)
}, {timestamps: false, updateOnDuplicate: true})

db.sequelize = mysql

module.exports = db
