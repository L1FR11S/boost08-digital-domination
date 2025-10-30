export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          lead_type: string | null
          name: string | null
          source_post_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          lead_type?: string | null
          name?: string | null
          source_post_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          lead_type?: string | null
          name?: string | null
          source_post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_leads_source_post_id_fkey"
            columns: ["source_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          cta_description: string | null
          cta_title: string | null
          excerpt: string
          featured_image: string | null
          id: string
          keywords: string[] | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          cta_description?: string | null
          cta_title?: string | null
          excerpt: string
          featured_image?: string | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          cta_description?: string | null
          cta_title?: string | null
          excerpt?: string
          featured_image?: string | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      contact_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      content_schedule: {
        Row: {
          auto_publish: boolean | null
          content_type: string | null
          created_at: string | null
          error_message: string | null
          generated_post_id: string | null
          id: string
          keywords: string[]
          primary_keyword: string | null
          published_at: string | null
          retry_count: number | null
          scheduled_date: string
          scheduled_time: string | null
          status: string | null
          target_audience: string | null
          target_word_count: number | null
          topic: string
          updated_at: string | null
        }
        Insert: {
          auto_publish?: boolean | null
          content_type?: string | null
          created_at?: string | null
          error_message?: string | null
          generated_post_id?: string | null
          id?: string
          keywords: string[]
          primary_keyword?: string | null
          published_at?: string | null
          retry_count?: number | null
          scheduled_date: string
          scheduled_time?: string | null
          status?: string | null
          target_audience?: string | null
          target_word_count?: number | null
          topic: string
          updated_at?: string | null
        }
        Update: {
          auto_publish?: boolean | null
          content_type?: string | null
          created_at?: string | null
          error_message?: string | null
          generated_post_id?: string | null
          id?: string
          keywords?: string[]
          primary_keyword?: string | null
          published_at?: string | null
          retry_count?: number | null
          scheduled_date?: string
          scheduled_time?: string | null
          status?: string | null
          target_audience?: string | null
          target_word_count?: number | null
          topic?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_schedule_generated_post_id_fkey"
            columns: ["generated_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_forms: {
        Row: {
          created_at: string
          description: string | null
          fields: Json
          id: string
          is_active: boolean
          name: string
          slug: string
          submit_button_text: string
          success_message: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          name: string
          slug: string
          submit_button_text?: string
          success_message?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          submit_button_text?: string
          success_message?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string
          form_id: string
          from_email: string
          from_name: string
          html_body: string
          id: string
          is_active: boolean
          recipient_email: string | null
          subject: string
          template_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_id: string
          from_email?: string
          from_name?: string
          html_body: string
          id?: string
          is_active?: boolean
          recipient_email?: string | null
          subject: string
          template_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_id?: string
          from_email?: string
          from_name?: string
          html_body?: string
          id?: string
          is_active?: boolean
          recipient_email?: string | null
          subject?: string
          template_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "custom_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      exit_intent_leads: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          form_id: string
          id: string
          internal_email_sent: boolean
          submission_data: Json
          user_email_sent: boolean
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          internal_email_sent?: boolean
          submission_data: Json
          user_email_sent?: boolean
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          internal_email_sent?: boolean
          submission_data?: Json
          user_email_sent?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "custom_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      free_trial_leads: {
        Row: {
          company_name: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          industry: string
          locations: number
          phone: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          industry: string
          locations: number
          phone: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          industry?: string
          locations?: number
          phone?: string
        }
        Relationships: []
      }
      roi_calculator_leads: {
        Row: {
          company: string
          created_at: string | null
          email: string
          estimated_increase: string | null
          id: string
          industry: string
          locations: number
          name: string
          new_customers: string | null
          phone: string
          revenue: string | null
          reviews: number
        }
        Insert: {
          company: string
          created_at?: string | null
          email: string
          estimated_increase?: string | null
          id?: string
          industry: string
          locations: number
          name: string
          new_customers?: string | null
          phone: string
          revenue?: string | null
          reviews: number
        }
        Update: {
          company?: string
          created_at?: string | null
          email?: string
          estimated_increase?: string | null
          id?: string
          industry?: string
          locations?: number
          name?: string
          new_customers?: string | null
          phone?: string
          revenue?: string | null
          reviews?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
