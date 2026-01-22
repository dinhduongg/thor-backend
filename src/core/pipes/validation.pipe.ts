import { UnprocessableEntityException, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export function createValidationPipe(options?: Partial<ValidationPipeOptions>) {
  const defaultOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false, // Bỏ qua field không tồn tại, không báo lỗi
    transformOptions: { enableImplicitConversion: true },
    stopAtFirstError: false, // false để lấy hết lỗi (khuyến nghị cho UX tốt hơn)

    // Format lỗi validation thành object { field: "message" }
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const formattedErrors = formatValidationErrors(validationErrors)

      return new UnprocessableEntityException({
        message: 'Dữ liệu đầu vào không hợp lệ',
        error: formattedErrors,
      })
    },
  }

  return new ValidationPipe({
    ...defaultOptions,
    ...options,
  })
}

/**
 * Format ValidationError[] → { fieldName: "lỗi đầu tiên" }
 * Nếu muốn lấy tất cả constraints → join bằng ', '
 */
function formatValidationErrors(errors: ValidationError[]): Record<string, string> {
  const result: Record<string, string> = {}

  errors.forEach((error) => {
    if (error.constraints) {
      // Lấy lỗi đầu tiên (thường là đủ, gọn gàng)
      const firstMessage = Object.values(error.constraints)[0]
      result[error.property] = firstMessage || 'Giá trị không hợp lệ'
    }

    // Nếu có nested validation (children) → đệ quy nếu cần
    if (error.children?.length) {
      Object.assign(result, formatNestedErrors(error.children, error.property))
    }
  })

  return result
}

// Optional: hỗ trợ nested (nếu bạn dùng ValidateNested nhiều cấp)
function formatNestedErrors(children: ValidationError[], parentPath: string = ''): Record<string, string> {
  const result: Record<string, string> = {}

  children.forEach((child) => {
    // const path = parentPath ? `${parentPath}.${child.property}` : child.property;
    const path = child.property
    if (child.constraints) {
      result[path] = Object.values(child.constraints)[0] || 'Giá trị không hợp lệ'
    }
    if (child.children?.length) {
      Object.assign(result, formatNestedErrors(child.children, path))
    }
  })

  return result
}
