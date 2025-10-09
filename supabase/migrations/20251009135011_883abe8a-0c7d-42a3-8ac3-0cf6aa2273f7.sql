-- Create enum types
CREATE TYPE public.user_role AS ENUM ('doctor', 'ngo', 'patient', 'admin');
CREATE TYPE public.ngo_type AS ENUM ('medical', 'non_medical');
CREATE TYPE public.gender AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');
CREATE TYPE public.consultation_mode AS ENUM ('free', 'low_cost', 'both');
CREATE TYPE public.consultation_status AS ENUM ('pending', 'scheduled', 'completed', 'cancelled');
CREATE TYPE public.aid_status AS ENUM ('under_review', 'approved', 'funds_released', 'rejected');
CREATE TYPE public.language_preference AS ENUM ('english', 'hindi');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  profile_photo_url TEXT,
  language_preference language_preference DEFAULT 'english',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  specialization TEXT NOT NULL,
  license_id TEXT NOT NULL UNIQUE,
  experience_years INTEGER NOT NULL,
  consultation_mode consultation_mode NOT NULL,
  availability_schedule TEXT,
  identity_proof_url TEXT,
  license_url TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  cases_helped INTEGER DEFAULT 0,
  hours_volunteered INTEGER DEFAULT 0,
  seva_mode_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create ngos table
CREATE TABLE public.ngos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  organization_name TEXT NOT NULL,
  ngo_type ngo_type NOT NULL,
  registration_number TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  area_of_operation TEXT,
  contact_person_name TEXT NOT NULL,
  contact_person_role TEXT,
  certificate_url TEXT NOT NULL,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  patients_helped INTEGER DEFAULT 0,
  camps_organized INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  age INTEGER NOT NULL,
  gender gender NOT NULL,
  village TEXT,
  health_issue TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create medical_documents table
CREATE TABLE public.medical_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL,
  document_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create consultations table
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE SET NULL,
  status consultation_status DEFAULT 'pending' NOT NULL,
  scheduled_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create aid_programs table
CREATE TABLE public.aid_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  eligibility_criteria TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create aid_applications table
CREATE TABLE public.aid_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  aid_program_id UUID REFERENCES public.aid_programs(id) ON DELETE CASCADE NOT NULL,
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE CASCADE NOT NULL,
  status aid_status DEFAULT 'under_review' NOT NULL,
  supporting_documents_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create medical_camps table
CREATE TABLE public.medical_camps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create camp_participants table (many-to-many for doctors and camps)
CREATE TABLE public.camp_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES public.medical_camps(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  confirmed BOOLEAN DEFAULT false,
  UNIQUE(camp_id, doctor_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aid_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aid_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_participants ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for doctors
CREATE POLICY "Doctors can view their own data" ON public.doctors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update their own data" ON public.doctors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert their own data" ON public.doctors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Verified doctors viewable by all authenticated" ON public.doctors
  FOR SELECT USING (verified = true AND auth.role() = 'authenticated');

-- RLS Policies for ngos
CREATE POLICY "NGOs can view their own data" ON public.ngos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "NGOs can update their own data" ON public.ngos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "NGOs can insert their own data" ON public.ngos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Verified NGOs viewable by all authenticated" ON public.ngos
  FOR SELECT USING (verified = true AND auth.role() = 'authenticated');

-- RLS Policies for patients
CREATE POLICY "Patients can view their own data" ON public.patients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own data" ON public.patients
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Patients can insert their own data" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for medical_documents
CREATE POLICY "Patients can manage their own documents" ON public.medical_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patients
      WHERE patients.id = medical_documents.patient_id
      AND patients.user_id = auth.uid()
    )
  );

-- RLS Policies for consultations
CREATE POLICY "Patients can view their consultations" ON public.consultations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patients
      WHERE patients.id = consultations.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view their consultations" ON public.consultations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors
      WHERE doctors.id = consultations.doctor_id
      AND doctors.user_id = auth.uid()
    )
  );

CREATE POLICY "NGOs can view their consultations" ON public.consultations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.ngos
      WHERE ngos.id = consultations.ngo_id
      AND ngos.user_id = auth.uid()
    )
  );

-- RLS Policies for aid_programs
CREATE POLICY "NGOs can manage their aid programs" ON public.aid_programs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.ngos
      WHERE ngos.id = aid_programs.ngo_id
      AND ngos.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can view available aid programs" ON public.aid_programs
  FOR SELECT USING (available = true AND auth.role() = 'authenticated');

-- RLS Policies for aid_applications
CREATE POLICY "Patients can view their aid applications" ON public.aid_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patients
      WHERE patients.id = aid_applications.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "NGOs can view applications for their programs" ON public.aid_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.ngos
      WHERE ngos.id = aid_applications.ngo_id
      AND ngos.user_id = auth.uid()
    )
  );

-- RLS Policies for medical_camps
CREATE POLICY "NGOs can manage their camps" ON public.medical_camps
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.ngos
      WHERE ngos.id = medical_camps.ngo_id
      AND ngos.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can view camps" ON public.medical_camps
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for camp_participants
CREATE POLICY "Doctors can view their camp participations" ON public.camp_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors
      WHERE doctors.id = camp_participants.doctor_id
      AND doctors.user_id = auth.uid()
    )
  );

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('identity-proofs', 'identity-proofs', false),
  ('medical-licenses', 'medical-licenses', false),
  ('ngo-certificates', 'ngo-certificates', false),
  ('medical-documents', 'medical-documents', false),
  ('profile-photos', 'profile-photos', true);

-- Storage policies for identity-proofs
CREATE POLICY "Users can upload their identity proof"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'identity-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their identity proof"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'identity-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for medical-licenses
CREATE POLICY "Doctors can upload their license"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'medical-licenses' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Doctors can view their license"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'medical-licenses' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for ngo-certificates
CREATE POLICY "NGOs can upload their certificate"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'ngo-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "NGOs can view their certificate"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ngo-certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for medical-documents
CREATE POLICY "Patients can upload medical documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Patients can view their medical documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'medical-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for profile-photos
CREATE POLICY "Users can upload profile photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ngos_updated_at BEFORE UPDATE ON public.ngos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_aid_programs_updated_at BEFORE UPDATE ON public.aid_programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_aid_applications_updated_at BEFORE UPDATE ON public.aid_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_camps_updated_at BEFORE UPDATE ON public.medical_camps
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();