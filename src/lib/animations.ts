import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Target = gsap.TweenTarget;
type AnimationOptions = {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  scrollTrigger?: ScrollTrigger.Vars;
  paused?: boolean;
};

const base = (options: AnimationOptions) => ({ duration: options.duration ?? .65, delay: options.delay ?? 0, stagger: options.stagger, ease: options.ease ?? "power3.out", scrollTrigger: options.scrollTrigger, paused: options.paused });

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const fadeUp = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ...base(options) });
export const fadeIn = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0 }, { autoAlpha: 1, ...base(options) });
export const textReveal = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0, yPercent: 112 }, { autoAlpha: 1, yPercent: 0, ...base(options) });
export const lineReveal = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" }, { autoAlpha: 1, scaleX: 1, ...base(options) });
export const imageReveal = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0, clipPath: "inset(8% 7% 8% 7%)" }, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", ...base(options) });
export const staggerReveal = (target: Target, options: AnimationOptions = {}) => fadeUp(target, { stagger: options.stagger ?? .1, ...options });
export const parallax = (target: Target, amount = -6, trigger?: Element | null) => gsap.to(target, { yPercent: amount, ease: "none", scrollTrigger: trigger ? { trigger, start: "top bottom", end: "bottom top", scrub: .8 } : undefined });
export const scaleReveal = (target: Target, options: AnimationOptions = {}) => gsap.fromTo(target, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, ...base(options) });
