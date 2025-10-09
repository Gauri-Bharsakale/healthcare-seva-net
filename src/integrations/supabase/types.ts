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
      aid_applications: {
        Row: {
          aid_program_id: string
          created_at: string
          id: string
          ngo_id: string
          notes: string | null
          patient_id: string
          status: Database["public"]["Enums"]["aid_status"]
          supporting_documents_url: string | null
          updated_at: string
        }
        Insert: {
          aid_program_id: string
          created_at?: string
          id?: string
          ngo_id: string
          notes?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["aid_status"]
          supporting_documents_url?: string | null
          updated_at?: string
        }
        Update: {
          aid_program_id?: string
          created_at?: string
          id?: string
          ngo_id?: string
          notes?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["aid_status"]
          supporting_documents_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aid_applications_aid_program_id_fkey"
            columns: ["aid_program_id"]
            isOneToOne: false
            referencedRelation: "aid_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aid_applications_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aid_applications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      aid_programs: {
        Row: {
          available: boolean | null
          created_at: string
          description: string
          eligibility_criteria: string | null
          id: string
          ngo_id: string
          title: string
          updated_at: string
        }
        Insert: {
          available?: boolean | null
          created_at?: string
          description: string
          eligibility_criteria?: string | null
          id?: string
          ngo_id: string
          title: string
          updated_at?: string
        }
        Update: {
          available?: boolean | null
          created_at?: string
          description?: string
          eligibility_criteria?: string | null
          id?: string
          ngo_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aid_programs_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_participants: {
        Row: {
          camp_id: string
          confirmed: boolean | null
          doctor_id: string
          id: string
        }
        Insert: {
          camp_id: string
          confirmed?: boolean | null
          doctor_id: string
          id?: string
        }
        Update: {
          camp_id?: string
          confirmed?: boolean | null
          doctor_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_participants_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "medical_camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_participants_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          created_at: string
          doctor_id: string | null
          id: string
          ngo_id: string | null
          notes: string | null
          patient_id: string
          scheduled_at: string | null
          status: Database["public"]["Enums"]["consultation_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          doctor_id?: string | null
          id?: string
          ngo_id?: string | null
          notes?: string | null
          patient_id: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string | null
          id?: string
          ngo_id?: string | null
          notes?: string | null
          patient_id?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          availability_schedule: string | null
          cases_helped: number | null
          consultation_mode: Database["public"]["Enums"]["consultation_mode"]
          created_at: string
          experience_years: number
          hours_volunteered: number | null
          id: string
          identity_proof_url: string | null
          license_id: string
          license_url: string
          seva_mode_active: boolean | null
          specialization: string
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          availability_schedule?: string | null
          cases_helped?: number | null
          consultation_mode: Database["public"]["Enums"]["consultation_mode"]
          created_at?: string
          experience_years: number
          hours_volunteered?: number | null
          id?: string
          identity_proof_url?: string | null
          license_id: string
          license_url: string
          seva_mode_active?: boolean | null
          specialization: string
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          availability_schedule?: string | null
          cases_helped?: number | null
          consultation_mode?: Database["public"]["Enums"]["consultation_mode"]
          created_at?: string
          experience_years?: number
          hours_volunteered?: number | null
          id?: string
          identity_proof_url?: string | null
          license_id?: string
          license_url?: string
          seva_mode_active?: boolean | null
          specialization?: string
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      medical_camps: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          ngo_id: string
          scheduled_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          ngo_id: string
          scheduled_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          ngo_id?: string
          scheduled_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_camps_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_documents: {
        Row: {
          document_type: string
          document_url: string
          id: string
          patient_id: string
          uploaded_at: string
        }
        Insert: {
          document_type: string
          document_url: string
          id?: string
          patient_id: string
          uploaded_at?: string
        }
        Update: {
          document_type?: string
          document_url?: string
          id?: string
          patient_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      ngos: {
        Row: {
          area_of_operation: string | null
          camps_organized: number | null
          certificate_url: string
          contact_person_name: string
          contact_person_role: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          ngo_type: Database["public"]["Enums"]["ngo_type"]
          organization_name: string
          patients_helped: number | null
          registration_number: string
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          area_of_operation?: string | null
          camps_organized?: number | null
          certificate_url: string
          contact_person_name: string
          contact_person_role?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          ngo_type: Database["public"]["Enums"]["ngo_type"]
          organization_name: string
          patients_helped?: number | null
          registration_number: string
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          area_of_operation?: string | null
          camps_organized?: number | null
          certificate_url?: string
          contact_person_name?: string
          contact_person_role?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          ngo_type?: Database["public"]["Enums"]["ngo_type"]
          organization_name?: string
          patients_helped?: number | null
          registration_number?: string
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          age: number
          created_at: string
          gender: Database["public"]["Enums"]["gender"]
          health_issue: string
          id: string
          updated_at: string
          user_id: string
          village: string | null
        }
        Insert: {
          age: number
          created_at?: string
          gender: Database["public"]["Enums"]["gender"]
          health_issue: string
          id?: string
          updated_at?: string
          user_id: string
          village?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"]
          health_issue?: string
          id?: string
          updated_at?: string
          user_id?: string
          village?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          language_preference:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone: string | null
          profile_photo_url: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          profile_photo_url?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          profile_photo_url?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
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
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      aid_status: "under_review" | "approved" | "funds_released" | "rejected"
      consultation_mode: "free" | "low_cost" | "both"
      consultation_status: "pending" | "scheduled" | "completed" | "cancelled"
      gender: "male" | "female" | "other" | "prefer_not_to_say"
      language_preference: "english" | "hindi"
      ngo_type: "medical" | "non_medical"
      user_role: "doctor" | "ngo" | "patient" | "admin"
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
      aid_status: ["under_review", "approved", "funds_released", "rejected"],
      consultation_mode: ["free", "low_cost", "both"],
      consultation_status: ["pending", "scheduled", "completed", "cancelled"],
      gender: ["male", "female", "other", "prefer_not_to_say"],
      language_preference: ["english", "hindi"],
      ngo_type: ["medical", "non_medical"],
      user_role: ["doctor", "ngo", "patient", "admin"],
    },
  },
} as const
