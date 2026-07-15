import type { Model, Document, QueryFilter, UpdateQuery } from 'mongoose'

/**
 * Base Repository cung cấp các phương thức CRUD cơ bản để làm việc với MongoDB thông qua Mongoose.
 * @template T - Kiểu Document Mongoose của Model tương ứng.
 */
class BaseRepository<T extends Document> {
  protected model: Model<T>

  /**
   * Khởi tạo Base Repository với Model Mongoose tương ứng.
   * @param model - Model Mongoose kế thừa từ Document.
   */
  constructor(model: Model<T>) {
    this.model = model
  }

  /**
   * Tạo một bản ghi mới trong database.
   * @param data - Dữ liệu của bản ghi mới.
   * @returns Promise chứa bản ghi (document) đã tạo thành công.
   */
  async create(data: Partial<T> | Record<string, unknown>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.model.create(data as any)
  }

  /**
   * Tìm kiếm bản ghi theo ID.
   * @param id - ID của bản ghi cần tìm.
   * @param select - Danh sách các trường cần lấy (ví dụ: 'name email' hoặc '-password').
   * @returns Promise chứa bản ghi tìm thấy hoặc null nếu không tồn tại.
   */
  async findById(id: string, select = ''): Promise<T | null> {
    if (select) {
      return await this.model.findById(id).select(select).exec() as T | null
    }
    return await this.model.findById(id).exec() as T | null
  }

  /**
   * Tìm kiếm duy nhất một bản ghi phù hợp với điều kiện truy vấn.
   * @param conditions - Điều kiện lọc tìm kiếm bản ghi (QueryFilter).
   * @param select - Danh sách các trường cần lấy (ví dụ: 'name email' hoặc '-password').
   * @returns Promise chứa bản ghi tìm thấy hoặc null nếu không tồn tại.
   */
  async findOne(conditions: QueryFilter<T>, select = ''): Promise<T | null> {
    if (select) {
      return await this.model.findOne(conditions).select(select).exec() as T | null
    }
    return await this.model.findOne(conditions).exec() as T | null
  }

  /**
   * Tìm kiếm danh sách các bản ghi phù hợp với điều kiện truy vấn.
   * @param conditions - Điều kiện lọc tìm kiếm (mặc định tìm tất cả {}).
   * @param select - Danh sách các trường cần lấy (ví dụ: 'name email').
   * @returns Promise chứa mảng các bản ghi tìm được.
   */
  async find(conditions: QueryFilter<T> = {}, select = ''): Promise<T[]> {
    if (select) {
      return await this.model.find(conditions).select(select).exec() as unknown as T[]
    }
    return await this.model.find(conditions).exec() as unknown as T[]
  }

  /**
   * Cập nhật thông tin bản ghi theo ID.
   * @param id - ID của bản ghi cần cập nhật.
   * @param data - Dữ liệu cập nhật mới (UpdateQuery).
   * @returns Promise chứa bản ghi sau khi đã cập nhật mới.
   */
  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
  }

  /**
   * Xóa bản ghi theo ID.
   * @param id - ID của bản ghi cần xóa.
   * @returns Promise chứa bản ghi đã bị xóa hoặc null nếu không tìm thấy.
   */
  async deleteById(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id)
  }

  /**
   * Lấy danh sách bản ghi có hỗ trợ phân trang và sắp xếp.
   * @param conditions - Điều kiện lọc tìm kiếm (mặc định {}).
   * @param page - Số thứ tự trang cần lấy (bắt đầu từ trang 1).
   * @param limit - Số lượng bản ghi tối đa trên mỗi trang (mặc định 10).
   * @param select - Danh sách các trường cần lấy.
   * @param sort - Tiêu chí sắp xếp bản ghi (mặc định sắp xếp giảm dần theo thời gian tạo { createdAt: -1 }).
   * @returns Đối tượng chứa danh sách bản ghi (data) và thông tin phân trang (pagination).
   */
  async findPaginated(conditions: QueryFilter<T> = {}, page = 1, limit = 10, select = '', sort: string | Record<string, 1 | -1 | 'asc' | 'desc'> = { createdAt: -1 }) {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.model.find(conditions).select(select).sort(sort as any).skip(skip).limit(limit).exec(),
      this.model.countDocuments(conditions)
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    }
  }
}

export default BaseRepository
