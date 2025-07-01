import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { BaseService } from "../services/base.service.js";

/**
 * Base controller class that provides common HTTP operations
 * All controller classes should extend this to inherit common functionality
 */
export abstract class BaseController<T = any> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  /**
   * Get all records
   * GET /list
   */
  async getAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { page, limit, ...filters } = req.query;
      
      const options: any = {};
      
      // Add pagination if provided
      if (page && limit) {
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        options.skip = (pageNum - 1) * limitNum;
        options.take = limitNum;
      }

      // Add filters if provided
      const where = this.buildWhereClause(filters);
      
      const records = await this.service.findMany(where, options);
      res.status(200).json(successResponse(records, "Records retrieved successfully"));
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json(errorResponse("Failed to retrieve records"));
    }
  }

  /**
   * Get record by ID
   * GET /:id
   */
  async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const record = await this.service.findById(id);

      if (!record) {
        res.status(404).json(errorResponse("Record not found"));
        return;
      }

      res.status(200).json(successResponse(record, "Record retrieved successfully"));
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json(errorResponse("Failed to retrieve record"));
    }
  }

  /**
   * Create a new record
   * POST /create
   */
  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const data = this.transformCreateData(req.body);
      const record = await this.service.create(data);
      res.status(201).json(successResponse(record, "Record created successfully"));
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json(errorResponse("Failed to create record"));
    }
  }

  /**
   * Update an existing record
   * PUT /:id
   */
  async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = this.transformUpdateData(req.body);

      // Check if record exists
      const existingRecord = await this.service.findById(id);
      if (!existingRecord) {
        res.status(404).json(errorResponse("Record not found"));
        return;
      }

      const record = await this.service.update(id, data);
      res.status(200).json(successResponse(record, "Record updated successfully"));
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json(errorResponse("Failed to update record"));
    }
  }

  /**
   * Delete a record
   * DELETE /:id
   */
  async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      // Check if record exists
      const existingRecord = await this.service.findById(id);
      if (!existingRecord) {
        res.status(404).json(errorResponse("Record not found"));
        return;
      }

      const record = await this.service.delete(id);
      res.status(200).json(successResponse(record, "Record deleted successfully"));
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json(errorResponse("Failed to delete record"));
    }
  }

  /**
   * Get record count
   * GET /count
   */
  async count(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const filters = req.query;
      const where = this.buildWhereClause(filters);
      const count = await this.service.count(where);
      res.status(200).json(successResponse({ count }, "Count retrieved successfully"));
    } catch (error) {
      console.error("Error in count:", error);
      res.status(500).json(errorResponse("Failed to get count"));
    }
  }

  /**
   * Search records (to be implemented by child classes)
   * GET /search
   */
  async search(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    res.status(501).json(errorResponse("Search not implemented for this resource"));
  }

  /**
   * Bulk create records
   * POST /bulk
   */
  async bulkCreate(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { data } = req.body;
      
      if (!Array.isArray(data)) {
        res.status(400).json(errorResponse("Data must be an array"));
        return;
      }

      const transformedData = data.map(item => this.transformCreateData(item));
      const result = await this.service.createMany(transformedData);
      res.status(201).json(successResponse(result, "Records created successfully"));
    } catch (error) {
      console.error("Error in bulkCreate:", error);
      res.status(500).json(errorResponse("Failed to create records"));
    }
  }

  /**
   * Transform request data for create operations
   * Override in child classes to customize data transformation
   */
  protected transformCreateData(data: any): any {
    return data;
  }

  /**
   * Transform request data for update operations
   * Override in child classes to customize data transformation
   */
  protected transformUpdateData(data: any): any {
    return data;
  }

  /**
   * Build where clause from query parameters
   * Override in child classes to customize filtering logic
   */
  protected buildWhereClause(filters: any): any {
    const where: any = {};
    
    // Remove pagination and common query params
    const { page, limit, sort, order, ...queryFilters } = filters;
    
    // Basic string filtering (exact match)
    Object.keys(queryFilters).forEach(key => {
      if (queryFilters[key] !== undefined && queryFilters[key] !== '') {
        where[key] = queryFilters[key];
      }
    });

    return where;
  }

  /**
   * Handle async errors in route handlers
   * Use this wrapper for all async route handlers
   */
  protected asyncHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  /**
   * Validate required fields
   * Override in child classes to add specific validation
   */
  protected validateRequiredFields(data: any, requiredFields: string[]): string[] {
    const errors: string[] = [];
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors.push(`${field} is required`);
      }
    });

    return errors;
  }

  /**
   * Bind methods to preserve 'this' context
   * Call this in constructor of child classes
   */
  protected bindMethods(): void {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
    this.search = this.search.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
  }
}
