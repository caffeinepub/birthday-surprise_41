import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddWish, useGetAllWishes } from "@/hooks/useQueries";
import { Heart, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { OrnamentedCard } from "./OrnamentedCard";

export function BirthdayWishes() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { data: wishes = [], isLoading } = useGetAllWishes();
  const addWish = useAddWish();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    try {
      await addWish.mutateAsync({ name: name.trim(), message: message.trim() });
      toast.success("Your wish was sent with love! ♥");
      setName("");
      setMessage("");
    } catch {
      toast.error("Couldn't send your wish. Please try again.");
    }
  };

  return (
    <section id="wishes" className="max-w-6xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="font-playfair text-3xl font-semibold text-foreground mb-1">
          Birthday Wishes for Sumit
        </h2>
        <div className="w-16 h-0.5 bg-gold mb-2" />
        <p className="font-cormorant text-muted-foreground text-lg">
          Leave a heartfelt message for Sumit on his special day
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OrnamentedCard>
            <h3 className="font-playfair text-xl font-medium text-foreground mb-6">
              Send Your Wishes
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="wish-name"
                  className="font-cormorant text-sm uppercase tracking-widest text-muted-foreground"
                >
                  Your Name
                </Label>
                <Input
                  id="wish-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul & Family"
                  className="mt-1 font-cormorant text-base"
                  data-ocid="wishes.name.input"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="wish-message"
                  className="font-cormorant text-sm uppercase tracking-widest text-muted-foreground"
                >
                  Your Message
                </Label>
                <Textarea
                  id="wish-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your birthday wish for Sumit here..."
                  className="mt-1 font-cormorant text-base min-h-[120px]"
                  data-ocid="wishes.message.textarea"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={addWish.isPending}
                className="w-full font-cormorant uppercase tracking-widest text-sm"
                data-ocid="wishes.submit_button"
              >
                {addWish.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Wishes
                  </>
                )}
              </Button>
            </form>
          </OrnamentedCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <OrnamentedCard className="min-h-[320px]">
            <h3 className="font-playfair text-xl font-medium text-foreground mb-6">
              Messages of Love
            </h3>
            {isLoading && (
              <div
                className="flex items-center justify-center py-10"
                data-ocid="wishes.loading_state"
              >
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && wishes.length === 0 && (
              <div className="text-center py-10" data-ocid="wishes.empty_state">
                <Heart className="text-primary/40 mx-auto mb-3" size={36} />
                <p className="font-dancing text-2xl text-muted-foreground">
                  Be the first to wish Sumit!
                </p>
              </div>
            )}
            <AnimatePresence>
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {wishes.map((wish, i) => (
                  <motion.div
                    key={`${wish.name}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border border-border p-4 bg-background"
                    data-ocid={`wishes.item.${i + 1}`}
                  >
                    <p className="font-dancing text-xl text-foreground leading-snug mb-2">
                      "{wish.message}"
                    </p>
                    <p className="font-cormorant text-sm text-muted-foreground uppercase tracking-widest">
                      — {wish.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </OrnamentedCard>
        </motion.div>
      </div>
    </section>
  );
}
