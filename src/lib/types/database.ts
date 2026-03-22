// This file is a placeholder for Supabase-generated types.
// Run `npm run db:types` to generate types from your Supabase project.
// See: https://supabase.com/docs/guides/api/rest/generating-types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
