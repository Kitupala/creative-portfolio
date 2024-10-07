"use client";

import { useGSAP } from "@gsap/react";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.3,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power4.inOut",
        },
      );

      window.onmousemove = (e) => {
        if (!component.current) return;

        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };
        let distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenter - 0.7,
              x: (-10 + 20) & componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };
    },
    { scope: component },
  );

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          className="avatar-image w-full object-contain"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
