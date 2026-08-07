/**
 * Database types generated from the live Supabase schema (0001_init).
 * Regenerate after any migration:
 *   supabase gen types typescript --project-id <id> > lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null
          archived_at: string | null
          city: string | null
          client_code: string
          country: string | null
          created_at: string
          departamento: Database["public"]["Enums"]["departamento_sv"] | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          archived_at?: string | null
          city?: string | null
          client_code?: string
          country?: string | null
          created_at?: string
          departamento?: Database["public"]["Enums"]["departamento_sv"] | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          archived_at?: string | null
          city?: string | null
          client_code?: string
          country?: string | null
          created_at?: string
          departamento?: Database["public"]["Enums"]["departamento_sv"] | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          client_id: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      rates: {
        Row: {
          active: boolean
          category: string
          default_fee: number
          label: string
          rate_per_lb: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          category: string
          default_fee?: number
          label: string
          rate_per_lb: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string
          default_fee?: number
          label?: string
          rate_per_lb?: number
          updated_at?: string
        }
        Relationships: []
      }
      shipment_events: {
        Row: {
          created_at: string
          id: string
          location: string | null
          note: string | null
          shipment_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          note?: string | null
          shipment_id: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          note?: string | null
          shipment_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipment_events_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          category: string
          client_id: string
          created_at: string
          delivered_at: string | null
          description: string | null
          direction: Database["public"]["Enums"]["shipment_direction"]
          id: string
          rate_per_lb: number
          shipping_fee: number
          status: string
          total_price: number | null
          tracking_number: string
          updated_at: string
          us_address: string | null
          us_city: string | null
          us_recipient: string | null
          us_state: string | null
          us_zip: string | null
          weight_lb: number
        }
        Insert: {
          category: string
          client_id: string
          created_at?: string
          delivered_at?: string | null
          description?: string | null
          direction?: Database["public"]["Enums"]["shipment_direction"]
          id?: string
          rate_per_lb: number
          shipping_fee?: number
          status?: string
          total_price?: number | null
          tracking_number?: string
          updated_at?: string
          us_address?: string | null
          us_city?: string | null
          us_recipient?: string | null
          us_state?: string | null
          us_zip?: string | null
          weight_lb: number
        }
        Update: {
          category?: string
          client_id?: string
          created_at?: string
          delivered_at?: string | null
          description?: string | null
          direction?: Database["public"]["Enums"]["shipment_direction"]
          id?: string
          rate_per_lb?: number
          shipping_fee?: number
          status?: string
          total_price?: number | null
          tracking_number?: string
          updated_at?: string
          us_address?: string | null
          us_city?: string | null
          us_recipient?: string | null
          us_state?: string | null
          us_zip?: string | null
          weight_lb?: number
        }
        Relationships: [
          {
            foreignKeyName: "shipments_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "rates"
            referencedColumns: ["category"]
          },
          {
            foreignKeyName: "shipments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      track_package: { Args: { p_tracking: string }; Returns: Json }
      update_shipments_status: {
        Args: { p_ids: string[]; p_status: string; p_note?: string | null; p_location?: string | null }
        Returns: undefined
      }
    }
    Enums: {
      departamento_sv:
        | "Ahuachapán"
        | "Cabañas"
        | "Chalatenango"
        | "Cuscatlán"
        | "La Libertad"
        | "La Paz"
        | "La Unión"
        | "Morazán"
        | "San Miguel"
        | "San Salvador"
        | "San Vicente"
        | "Santa Ana"
        | "Sonsonate"
        | "Usulután"
      shipment_direction: "usa_to_sv" | "sv_to_usa"
      user_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience row aliases for app code.
type PublicSchema = Database["public"]
export type Client = PublicSchema["Tables"]["clients"]["Row"]
export type Rate = PublicSchema["Tables"]["rates"]["Row"]
export type Shipment = PublicSchema["Tables"]["shipments"]["Row"]
export type ShipmentEvent = PublicSchema["Tables"]["shipment_events"]["Row"]
export type Profile = PublicSchema["Tables"]["profiles"]["Row"]

/** App roles. `admin` = staff dashboard; `client` = self-service (future). */
export type UserRole = PublicSchema["Enums"]["user_role"]

/** The 14 departments of El Salvador (delivery destination). */
export type Departamento = PublicSchema["Enums"]["departamento_sv"]

/** Shipping direction. */
export type ShipmentDirection = PublicSchema["Enums"]["shipment_direction"]

/** Shipment status values allowed by the DB check constraint. */
export type ShipmentStatus =
  | "received"
  | "to_airport"
  | "in_transit"
  | "at_customs"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
