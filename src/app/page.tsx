import Hero from "./my_components/specific/Hero";
import { AuthManager } from "@/lib/auth/auth-manager";
import type { Metadata } from "next";
import { buildStaticMetadata } from "@/lib/metadata/builders";
import { buildHomeSchema, renderJsonLd } from "@/lib/metadata/schema";

export const metadata: Metadata = buildStaticMetadata('home');

export default async function Home() {
  const user = await AuthManager.getAuthenticatedUser();
  return (
      <div className="flex flex-1 flex-col h-full items-center pt-14 px-4 w-full max-w-4xl mx-auto">
        {renderJsonLd(buildHomeSchema())}
        <Hero />
      </div>
  )
}
