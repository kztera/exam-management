import { PrismaClient } from "@prisma/client";

/**
 * Database class to handle Prisma client instance.
 */
class Database {
  private static instance: Database;
  public prisma!: PrismaClient;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.prisma = new PrismaClient({
      errorFormat: "minimal",
    });
    Database.instance = this;
  }
}

export default new Database();
