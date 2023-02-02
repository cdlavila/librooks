"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv === null || dotenv === void 0 ? void 0 : dotenv.config({ path: '.env' });
const config = {
    development: {
        type: 'mysql',
        host: (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.DATABASE_HOST_DEV,
        port: parseInt((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.DATABASE_PORT_DEV, 10),
        database: (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.DATABASE_NAME_DEV,
        username: (_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.DATABASE_USER_DEV,
        password: (_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.DATABASE_PASSWORD_DEV,
        logging: true,
        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [(0, path_1.join)(__dirname, 'src/database/migrations/', '*.{ts,js}')],
        migrationsTableName: 'migrations',
    },
    test: {
        type: 'mysql',
        host: (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.DATABASE_HOST_TEST,
        port: parseInt((_g = process === null || process === void 0 ? void 0 : process.env) === null || _g === void 0 ? void 0 : _g.DATABASE_PORT_TEST, 10),
        database: (_h = process === null || process === void 0 ? void 0 : process.env) === null || _h === void 0 ? void 0 : _h.DATABASE_NAME_TEST,
        username: (_j = process === null || process === void 0 ? void 0 : process.env) === null || _j === void 0 ? void 0 : _j.DATABASE_USER_TEST,
        password: (_k = process === null || process === void 0 ? void 0 : process.env) === null || _k === void 0 ? void 0 : _k.DATABASE_PASSWORD_TEST,
        logging: true,
        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [(0, path_1.join)(__dirname, 'src/database/migrations/', '*.{ts,js}')],
        migrationsTableName: 'migrations',
    },
    production: {
        type: 'mysql',
        host: (_l = process === null || process === void 0 ? void 0 : process.env) === null || _l === void 0 ? void 0 : _l.DATABASE_HOST_PROD,
        port: parseInt((_m = process === null || process === void 0 ? void 0 : process.env) === null || _m === void 0 ? void 0 : _m.DATABASE_PORT_PROD, 10),
        database: (_o = process === null || process === void 0 ? void 0 : process.env) === null || _o === void 0 ? void 0 : _o.DATABASE_NAME_PROD,
        username: (_p = process === null || process === void 0 ? void 0 : process.env) === null || _p === void 0 ? void 0 : _p.DATABASE_USER_PROD,
        password: (_q = process === null || process === void 0 ? void 0 : process.env) === null || _q === void 0 ? void 0 : _q.DATABASE_PASSWORD_PROD,
        logging: true,
        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [(0, path_1.join)(__dirname, 'src/database/migrations/', '*.{ts,js}')],
        migrationsTableName: 'migrations',
    },
};
exports.default = new typeorm_1.DataSource(config[(_r = process === null || process === void 0 ? void 0 : process.env) === null || _r === void 0 ? void 0 : _r.NODE_ENV]);
//# sourceMappingURL=typeorm-cli.config.js.map