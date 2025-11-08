// Database types - generated from Supabase schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          name: string
          surname: string
          email: string
          mobile: string
          service_type: string
          status: string
          guest_count?: number
          travel_dates?: string
          budget_range?: string
          special_requests?: string
          coordinator_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          surname: string
          email: string
          mobile: string
          service_type: string
          status?: string
          guest_count?: number
          travel_dates?: string
          budget_range?: string
          special_requests?: string
          coordinator_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          surname?: string
          email?: string
          mobile?: string
          service_type?: string
          status?: string
          guest_count?: number
          travel_dates?: string
          budget_range?: string
          special_requests?: string
          coordinator_id?: string
        }
      }
      services_catalog: {
        Row: {
          id: string
          service_type: string
          service_name: string
          description: string
          base_questions: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          service_type: string
          service_name: string
          description?: string
          base_questions: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          service_type?: string
          service_name?: string
          description?: string
          base_questions?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          user_id?: string
          service_type: string
          status: string
          total_price?: number
          booking_date?: string
          guests?: number
        }
      }
    }
  }
}
