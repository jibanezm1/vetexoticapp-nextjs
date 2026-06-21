import { get, ref, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  COURSE_TITLE,
  COURSE_DESCRIPTION,
  SPECIES_DATA,
} from "./courseData";

export async function seedWildlifeCourse(courseId: string): Promise<{ created: boolean; message: string }> {
  const courseRef = ref(db, `courses/${courseId}`);
  const snap = await get(courseRef);

  if (snap.exists()) {
    const existing = snap.val();
    // Add any missing species without overwriting existing
    const updates: Record<string, unknown> = {};
    for (const [speciesId, speciesData] of Object.entries(SPECIES_DATA)) {
      if (!existing.species?.[speciesId]) {
        updates[`courses/${courseId}/species/${speciesId}`] = {
          ...speciesData,
          enabled: false,
          enabledAt: null,
          enabledBy: null,
        };
      }
    }
    if (Object.keys(updates).length > 0) {
      await update(ref(db), updates);
      return { created: false, message: "Especies faltantes agregadas al curso existente." };
    }
    return { created: false, message: "El curso ya existe y está completo." };
  }

  // Create full course from scratch
  const speciesWithMeta: Record<string, unknown> = {};
  for (const [speciesId, speciesData] of Object.entries(SPECIES_DATA)) {
    speciesWithMeta[speciesId] = {
      ...speciesData,
      enabled: false,
      enabledAt: null,
      enabledBy: null,
    };
  }

  await set(courseRef, {
    title: COURSE_TITLE,
    description: COURSE_DESCRIPTION,
    createdAt: Date.now(),
    settings: {
      allowMultipleEnabledSpecies: true,
      allowEditAfterSubmit: true,
    },
    species: speciesWithMeta,
  });

  return { created: true, message: "Curso inicializado correctamente en Firebase." };
}
