import { redirect } from "next/navigation";

// Kök URL → middleware zaten yönlendiriyor, bu fallback
export default function RootPage() {
  redirect("/tr");
}
