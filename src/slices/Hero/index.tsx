"use client";

import Bounded from "@/app/components/Bounded";
import { useGSAP } from "@gsap/react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useRef } from "react";
import Shapes from "./Shapes";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;

    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "elastic.out(1,0.3)" } });

      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: 0.5,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
      );

      tl.fromTo(
        ".title",
        {
          opacity: 0,
          y: 20,
          scale: 1.2,
        },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
      );
    },
    { scope: container },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={container}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl uppercase tracking-[.2em] text-transparent opacity-0 md:text-3xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
