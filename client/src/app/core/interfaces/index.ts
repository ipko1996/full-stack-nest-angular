/**
 * For keeping it simple, I have put all the interfaces in this file
 * for a big application I would have created a separate file for each domain
 * and used (barrel)[https://basarat.gitbook.io/typescript/main-1/barrel] file to export all the interfaces
 */
export interface User {
  id: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  role?: string;
}
