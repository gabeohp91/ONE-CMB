export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const languageOptions: LanguageOption[] = [
  { code: 'auto', name: 'Auto-detect', nativeName: 'Tự động phát hiện' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'en', name: 'English', nativeName: 'Tiếng Anh' },
  { code: 'fr', name: 'French', nativeName: 'Tiếng Pháp' },
  { code: 'de', name: 'German', nativeName: 'Tiếng Đức' },
  { code: 'ja', name: 'Japanese', nativeName: 'Tiếng Nhật' },
  { code: 'ko', name: 'Korean', nativeName: 'Tiếng Hàn' },
  { code: 'zh', name: 'Chinese', nativeName: 'Tiếng Trung' }
];