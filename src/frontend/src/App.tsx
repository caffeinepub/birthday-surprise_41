import { Toaster } from "@/components/ui/sonner";
import { FirstMeetup } from "./components/FirstMeetup";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeartfeltMessage } from "./components/HeartfeltMessage";
import { Hero } from "./components/Hero";
import { LoveNotes } from "./components/LoveNotes";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" richColors />
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="bg-background">
          <HeartfeltMessage />
          <FirstMeetup />
          <LoveNotes />
        </div>
      </main>
      <Footer />
    </div>
  );
}
