export type CourseQuestionType = "open" | "multiple_choice";

export interface CourseQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CourseQuestion {
  id: string;
  category: string;
  text: string;
  type: CourseQuestionType;
  expectedAnswer: string;
  citation: { source: string; url: string };
  order: number;
  minLength?: number;
  options?: CourseQuestionOption[];
}

export interface CourseSpecies {
  id: string;
  name: string;
  emoji: string;
  order: number;
  enabled: boolean;
  enabledAt: number | null;
  enabledBy: string | null;
  caseText: string;
  keyConcept: string;
  questions: Record<string, CourseQuestion>;
}

export interface CourseSettings {
  allowMultipleEnabledSpecies: boolean;
  allowEditAfterSubmit: boolean;
}

export interface Course {
  title: string;
  description: string;
  createdAt: number;
  settings: CourseSettings;
  species: Record<string, CourseSpecies>;
}

export interface CourseStudent {
  id: string;
  name: string;
  email: string;
  group: string;
  createdAt: number;
  lastAccessAt: number;
  sessionUrl: string;
}

export interface QuestionResponse {
  answer: string;
  status: "draft" | "submitted";
  createdAt: number;
  updatedAt: number;
  submittedAt: number | null;
}

export type SpeciesResponses = Record<string, QuestionResponse>;
export type StudentResponses = Record<string, SpeciesResponses>;
export type AllStudentResponses = Record<string, StudentResponses>;
