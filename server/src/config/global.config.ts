import dotenv from "dotenv";
dotenv.config();

const config: any = {
  version: process.env.VERSION,
  port: process.env.PORT || 8080,
  sandbox: process.env.SANDBOX || false,
  cors: { origin: process.env.CORS_ORIGIN },
  security: {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    salt: process.env.SEC_SALT,
    hashRounds: process.env.SEC_HASH_ROUNDS,
    loginDuration: process.env.SEC_LOGIN_DURATION,
  },
  database: {
    dbname: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    driver: process.env.DB_DRIVER,
    dialectOptions: {
      ssl: {
        require: process.env.DB_DRIVER_OPTIONS_SSL_REQUIRE || true,
        rejectUnauthorized: process.env.DB_DRIVER_OPTIONS_SSL_REJECT_UNAUTHORIZED || false
      },
      multipleStatements: true
    },
    sequelizeOptions: {
      timezone: process.env.DB_TIMEZONE || '+07:00',
    },
    // สร้าง database ใหม่ ถ้ามี table อยู่แล้วจะทำการ drop **อย่าลืม backup
    dropAndCreateNew: process.env.DB_DROP_AND_CREAT_NEW || false,
    // ใส่ข้อมูลเริ่มต้นใน database จะทำงานก็ต่อเมื่อ dropAndCreateNew=true เท่านั้น
    insertInitData: process.env.DB_INIT_DATA || false,
    seedSqlData: process.env.DB_SEED_SQL || false,
    // จะทำงานก็ต่อเมื่อ dropAndCreateNew=false เท่านั้น
    syncOption: {
      // ถ้า alter=true จะทำการ alter table
      alter: process.env.DB_ALTER || false,
    },
    logging: process.env.DB_LOGGING || true,
  },
};
export default config;
