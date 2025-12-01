
export type Category = 'heritage' | 'painting-folk-arts' | 'crafts-handicrafts' | 'music-dance' | 'languages' | 'festivals';

export interface ContentItem {
  id: string;
  title: string;
  category: Category;
  shortDescription: string;
  image: string;
  contentHTML: string;
}

export type View = 
  | { type: 'home' }
  | { type: 'list'; category: Category }
  | { type: 'detail'; contentId: string };

export interface Message {
  role: 'user' | 'model' | 'error';
  content: string;
}
