export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface AppState {
  users: User[];
  posts: Post[];
  comments: Comment[];
}