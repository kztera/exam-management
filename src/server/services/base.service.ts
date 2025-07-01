import db from "./database.js";

/**
 * Base service class that provides common database operations
 * All service classes should extend this to inherit common functionality
 */
export abstract class BaseService<T = any> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Get the Prisma model for this service
   * @returns {any} Prisma model
   */
  protected get model(): any {
    return (db.prisma as any)[this.tableName];
  }

  /**
   * Retrieves all records from the table
   * @param {object} options - Query options (where, orderBy, include, etc.)
   * @returns {Promise<T[]>} List of records
   */
  async findAll(options: any = {}): Promise<T[]> {
    return this.model.findMany(options);
  }

  /**
   * Finds a record by its ID
   * @param {number|string} id - The record ID
   * @param {object} options - Query options (include, select, etc.)
   * @returns {Promise<T|null>} Record or null if not found
   */
  async findById(id: number | string, options: any = {}): Promise<T | null> {
    return this.model.findUnique({
      where: { id: Number(id) },
      ...options,
    });
  }

  /**
   * Finds records based on criteria
   * @param {object} where - Where conditions
   * @param {object} options - Query options (orderBy, include, etc.)
   * @returns {Promise<T[]>} List of matching records
   */
  async findMany(where: any = {}, options: any = {}): Promise<T[]> {
    return this.model.findMany({
      where,
      ...options,
    });
  }

  /**
   * Finds the first record matching criteria
   * @param {object} where - Where conditions
   * @param {object} options - Query options (orderBy, include, etc.)
   * @returns {Promise<T|null>} First matching record or null
   */
  async findFirst(where: any = {}, options: any = {}): Promise<T | null> {
    return this.model.findFirst({
      where,
      ...options,
    });
  }

  /**
   * Creates a new record
   * @param {any} data - Record data
   * @param {object} options - Query options (include, select, etc.)
   * @returns {Promise<T>} Created record
   */
  async create(data: any, options: any = {}): Promise<T> {
    return this.model.create({
      data,
      ...options,
    });
  }

  /**
   * Updates an existing record
   * @param {number|string} id - Record ID to update
   * @param {any} data - Updated record data
   * @param {object} options - Query options (include, select, etc.)
   * @returns {Promise<T>} Updated record
   */
  async update(id: number | string, data: any, options: any = {}): Promise<T> {
    return this.model.update({
      where: { id: Number(id) },
      data,
      ...options,
    });
  }

  /**
   * Updates records based on criteria
   * @param {object} where - Where conditions
   * @param {any} data - Updated data
   * @returns {Promise<any>} Update result
   */
  async updateMany(where: any, data: any): Promise<any> {
    return this.model.updateMany({
      where,
      data,
    });
  }

  /**
   * Deletes a record
   * @param {number|string} id - Record ID to delete
   * @returns {Promise<T>} Deleted record
   */
  async delete(id: number | string): Promise<T> {
    return this.model.delete({
      where: { id: Number(id) },
    });
  }

  /**
   * Deletes records based on criteria
   * @param {object} where - Where conditions
   * @returns {Promise<any>} Delete result
   */
  async deleteMany(where: any): Promise<any> {
    return this.model.deleteMany({
      where,
    });
  }

  /**
   * Counts records based on criteria
   * @param {object} where - Where conditions
   * @returns {Promise<number>} Number of matching records
   */
  async count(where: any = {}): Promise<number> {
    return this.model.count({
      where,
    });
  }

  /**
   * Checks if a record exists
   * @param {object} where - Where conditions
   * @returns {Promise<boolean>} True if record exists
   */
  async exists(where: any): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }

  /**
   * Creates many records in a single transaction
   * @param {any[]} data - Array of record data
   * @param {object} options - Query options
   * @returns {Promise<any>} Create result
   */
  async createMany(data: any[], options: any = {}): Promise<any> {
    return this.model.createMany({
      data,
      ...options,
    });
  }

  /**
   * Upserts a record (create or update)
   * @param {object} where - Unique identifier
   * @param {any} update - Data to update if record exists
   * @param {any} create - Data to create if record doesn't exist
   * @param {object} options - Query options
   * @returns {Promise<T>} Upserted record
   */
  async upsert(where: any, update: any, create: any, options: any = {}): Promise<T> {
    return this.model.upsert({
      where,
      update,
      create,
      ...options,
    });
  }
}
