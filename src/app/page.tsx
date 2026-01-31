import Hero from "./my_components/specific/Hero";
import { AuthManager } from "@/lib/auth/auth-manager";

export default async function Home() {
  const user = await AuthManager.getAuthenticatedUser();
  return (
      <div className="flex flex-1 flex-col h-full items-center pt-14 px-4 w-full max-w-4xl mx-auto">        
        <Hero />
      </div>
  )
}
