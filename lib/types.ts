export const TEAMS = [
  "인사팀",
  "마케팅팀",
  "개발팀",
  "교육팀",
  "영업팀",
  "전략기획팀",
] as const;

export type Team = (typeof TEAMS)[number];

export interface Post {
  id: string;
  team: Team;
  title: string;
  content: string;
  createdAt: string;
}

export type NewPost = Omit<Post, "id" | "createdAt">;
