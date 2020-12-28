import { execSync } from "child_process";

import { calculateBinaryPath } from "./resolve";

interface DbmateOptions {
  connectionString: string;
  dbmateWait: number;
  migrationsDir?: string;
  migrationsTable?: string;
  noDumpSchema?: boolean;
  waitTimeout?: number;
}

class DbMate {
  private binaryPath: string;
  private dbUrl: string;
  dbmateWait?: number;
  migrationsDir?: string;
  migrationsTable?: string;
  noDumpSchema?: boolean;
  waitTimeout?: number;

  constructor(opts: DbmateOptions) {
    this.binaryPath = calculateBinaryPath();
    this.dbUrl = opts.connectionString;
    this.migrationsDir = opts.migrationsDir
      ? opts.migrationsDir
      : "./db/migrations";
    this.migrationsTable = opts.migrationsTable
      ? opts.migrationsTable
      : "schema_migrations";
    this.dbmateWait = opts.dbmateWait;
    this.noDumpSchema = opts.noDumpSchema === true ? true : false;
    this.waitTimeout = opts.waitTimeout;
  }

  async up() {
    execSync(`${this.binaryPath} --env DB_URL up`, {
      env: {
        DB_URL: this.dbUrl,
        DBMATE_MIGRATIONS_DIR: this.migrationsDir,
        DBMATE_MIGRATIONS_TABLE: this.migrationsTable,
        DBMATE_NO_DUMP_SCHEMA: this.noDumpSchema?.toString(),
        DBMATE_WAIT: this.dbmateWait?.toString(),
        DBMATE_WAIT_TIMEOUT: this.waitTimeout?.toString(),
      },
    });
  }

  async down() {
    execSync(`${this.binaryPath} --env DB_URL down`, {
      env: {
        DB_URL: this.dbUrl,
        DBMATE_MIGRATIONS_DIR: this.migrationsDir,
        DBMATE_MIGRATIONS_TABLE: this.migrationsTable,
        DBMATE_NO_DUMP_SCHEMA: this.noDumpSchema?.toString(),
        DBMATE_WAIT: this.dbmateWait?.toString(),
        DBMATE_WAIT_TIMEOUT: this.waitTimeout?.toString(),
      },
    });
  }

  async drop() {
    execSync(`${this.binaryPath} --env DB_URL drop`, {
      env: {
        DB_URL: this.dbUrl,
        DBMATE_MIGRATIONS_DIR: this.migrationsDir,
        DBMATE_MIGRATIONS_TABLE: this.migrationsTable,
        DBMATE_NO_DUMP_SCHEMA: this.noDumpSchema?.toString(),
        DBMATE_WAIT: this.dbmateWait?.toString(),
        DBMATE_WAIT_TIMEOUT: this.waitTimeout?.toString(),
      },
    });
  }
}

export default DbMate;
