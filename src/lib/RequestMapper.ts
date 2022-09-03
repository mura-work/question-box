// postの型定義
type QuestionInput = {
  title: string;
  content: string;
  genres: number[];
};

type CommentInput = {
  content: string;
};

type PostBody = QuestionInput | CommentInput;

// updateの型定義
type QuestionUpdateInput = {
  id: number;
  title: string;
  content: string;
  genres: number[];
  comments: Comment[];
};

type CommentUpdateInput = {
  id: number;
  content: string;
};

type UpdateBody = QuestionUpdateInput | CommentUpdateInput;

// deleteの型定義
type deleteParamType = {
  id: number;
};

export default class RequestMapper {
  static async get(url: string) {
    const result = await fetch("/api" + url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
  }

  static async post(url: string, body: PostBody) {
    return await fetch("/api" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  static async update(url: string, body: UpdateBody) {
    return await fetch("/api" + url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  static async delete(url: string, body: deleteParamType) {
    return await fetch("/api" + url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}
