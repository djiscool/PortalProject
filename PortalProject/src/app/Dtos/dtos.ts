export interface UserForAuthenticationDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  Email: string;
  role?: string;
  loginMethod?: string;
  password?: string;
}

export interface PagedUsersDto {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  users : UserDto[];
}
