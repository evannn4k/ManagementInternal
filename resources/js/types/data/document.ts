import { UserWithRole } from "./user";

export type DocumentType = {
  id: string;
  documentable_type: string | null;
  documentable_id: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by: number | null;
  created_at: string;
  updated_at: string;
  
  uploader?: UserWithRole;
  documentable?: any; 
}