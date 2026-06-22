import type { CourseQuestion, QuestionResponse } from "./types";

export function hasStoredAnswer(answer: string | null | undefined): boolean {
  return typeof answer === "string" && answer.trim().length > 0;
}

export function getQuestionMinimumLength(question: CourseQuestion): number {
  return question.type === "open" ? question.minLength ?? 50 : 0;
}

export function isQuestionAnswered(
  question: CourseQuestion,
  response?: QuestionResponse,
  draftAnswer?: string
): boolean {
  const answer = draftAnswer ?? response?.answer ?? "";
  if (question.type === "multiple_choice") {
    return hasStoredAnswer(answer);
  }
  return answer.trim().length >= getQuestionMinimumLength(question);
}

export function getQuestionResponseText(
  question: CourseQuestion,
  response?: QuestionResponse
): string {
  const answer = response?.answer ?? "";
  if (!hasStoredAnswer(answer)) {
    return "";
  }

  if (question.type !== "multiple_choice") {
    return answer;
  }

  return question.options?.find((option) => option.id === answer)?.text ?? answer;
}