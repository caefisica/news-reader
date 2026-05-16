// Registers GSAP ScrollTrigger globally for .mask-text reveals.
// Only runs client-side (plugin name ends with .client.ts).
export default defineNuxtPlugin(async () => {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  useRouter().afterEach(() => {
    nextTick(() => {
      for (const el of gsap.utils.toArray<HTMLElement>(".mask-text > *")) {
        gsap.to(el, {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    });
  });
});
