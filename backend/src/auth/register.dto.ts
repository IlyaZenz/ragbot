import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

// Регулярное выражение для пароля:
// ^                 - начало строки
// (?=.*[a-z])       - хотя бы одна маленькая латинская буква
// (?=.*[A-Z])       - хотя бы одна большая латинская буква
// (?=.*\d)          - хотя бы одна цифра
// (?=.*[@$!%*?&])   - хотя бы один спецсимвол
// [A-Za-z\d@$!%*?&] - разрешенные символы
// {8,}              - минимум 8 символов длиной
// $                 - конец строки
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).*$/;

// Регулярное выражение для имени пользователя:
// ^[a-zA-Z0-9]+$    - Только латинские буквы (заглавные и строчные) и цифры
const usernameRegex = /^[a-zA-Z0-9]+$/;

export class RegisterDto {
  // --- USERNAME ---
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  // Проверка на латинские буквы и цифры
  @Matches(usernameRegex, {
    message:
      'Username can only contain Latin letters and numbers (a-z, A-Z, 0-9).',
  })
  username: string;

  // --- EMAIL ---
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  // --- PASSWORD ---
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  // Проверка на сложность
  @Matches(passwordRegex, {
    message: 'Password must contain both letters and numbers.',
  })
  password: string;
}
