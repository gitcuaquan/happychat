import type { $Fetch } from "ofetch";

// Class cơ sở nếu bạn cần viết các hàm dùng chung cho mọi service
export class BaseService {
  constructor(protected fetcher: $Fetch) {}
}
