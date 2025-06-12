export interface Post {
  _id?: string;
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
}

export interface PostsResponse {
  posts: Post[];
  hasMore: boolean;
  total: number;
} 