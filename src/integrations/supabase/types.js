/**
 * Types and info about relations based on the Supabase schema.
 * 
 * Table: posts
 * - id: integer, primary key
 * - title: text
 * - body: text
 * - created_at: timestamp with time zone, default: CURRENT_TIMESTAMP
 * - author_id: uuid
 * 
 * Table: reactions
 * - id: integer, primary key
 * - post_id: integer, foreign key to posts.id
 * - user_id: uuid
 * - emoji: character(2)
 */

export const Post = {
  id: 'integer',
  title: 'text',
  body: 'text',
  created_at: 'timestamp with time zone',
  author_id: 'uuid',
};

export const Reaction = {
  id: 'integer',
  post_id: 'integer',
  user_id: 'uuid',
  emoji: 'character(2)',
};