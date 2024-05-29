"use server";
import { revalidatePath } from "next/cache";

export const reload = async () => {
  revalidatePath("/cart");
};
