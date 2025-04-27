
export interface Employee {
  id: number;
  nom: string;
  tags: string[];
  bio: string;
  contact: {
    linkedin?: string;
    portfolio?: string;
  };
  photo: string | null;
}
