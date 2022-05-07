export interface Moment {
  id?: number;
  title: string;
  description: string;
  image: string;
  created?: string;
  updated?: string;
  comments?: [{ text: string, username: string }];
}