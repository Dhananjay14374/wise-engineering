import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import DarkCard from "./ui/DarkCard";

export default function TestimonialSlider({ items = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t) => (
            <div key={t.name} className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_70%] lg:flex-[0_0_55%]">
              <DarkCard className="mx-auto max-w-2xl">
                <Quote className="w-9 h-9 text-brand-300 mb-4" strokeWidth={1.5} />
                <p className="text-lg md:text-xl leading-relaxed text-white font-medium">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-white/50">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                </div>
              </DarkCard>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-brand-500" : "w-2 bg-ink-900/15"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
