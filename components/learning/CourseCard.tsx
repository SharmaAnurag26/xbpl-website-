import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { ImageSlot } from "@/components/media/ImageSlot";
import type { Course } from "@/content/types";

type CourseCardProps = {
  course: Course;
  formats: string[];
  enquireLabel?: string;
  headingLevel?: "h2" | "h3";
};

/** Enquiry link that pre-selects Learning and names the course in the message. */
export const courseEnquiryHref = (course: Course) =>
  `/contact?interest=learning&course=${encodeURIComponent(course.title)}`;

/** Course card: photo, category, summary, delivery formats; the whole card links to an enquiry. */
export function CourseCard({
  course,
  formats,
  enquireLabel = "Enquire",
  headingLevel: H = "h3",
}: CourseCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/60">
      <div className="relative">
        <ImageSlot
          slot={course.image}
          alt=""
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/75 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-volt uppercase backdrop-blur">
          {course.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <H className="font-display text-xl leading-snug font-medium tracking-[-0.01em] text-white">
          <NextLink
            href={courseEnquiryHref(course)}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-cyan-soft"
          >
            {course.title}
          </NextLink>
        </H>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{course.summary}</p>
        <ul aria-label="Delivery formats" className="mt-5 flex flex-wrap gap-1.5">
          {formats.map((f) => (
            <li
              key={f}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-white/80"
            >
              {f}
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text"
        >
          {enquireLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
