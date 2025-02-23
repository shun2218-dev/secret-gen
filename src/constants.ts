export const S =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%^_='; // 70文字
export const S_LENGTH = S.length;
export const BYTE_RANGE = 256;
export const MAX_VALID_BYTE = BYTE_RANGE - (BYTE_RANGE % S_LENGTH); // 256 - (256 % 70) = 256 - 8 = 210
export const DEFAULT_LENGTH = 22;
