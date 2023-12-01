import * as fs from 'fs';

export class FileHelper {
  public static ReadFile(path: string): string[] {
    const words = fs.readFileSync(path, 'utf-8');
    const wordList = words.split('\r\n');
    return wordList;
  }
}
