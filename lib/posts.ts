import { supabase } from "./supabaseClient";
import type { NewPost, Post, Team } from "./types";

interface PostRow {
  id: string;
  team: Team;
  title: string;
  content: string;
  created_at: string;
}

function mapRow(row: PostRow): Post {
  return {
    id: row.id,
    team: row.team,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as PostRow[]).map(mapRow);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data as PostRow) : undefined;
}

export async function createPost(input: NewPost): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({ team: input.team, title: input.title, content: input.content })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data as PostRow);
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}
