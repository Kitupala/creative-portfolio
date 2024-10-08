import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import { MdCircle } from "react-icons/md";
import { div } from "three/webgpu";

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div">
        <Heading size="lg" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.tech.map((item, index) => (
        <div
          key={index}
          className="tech-row mb-4 flex items-center justify-center gap-4 text-slate-700"
          aria-label={item.tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="tech-item text-6xl font-extrabold uppercase"
                style={{
                  color:
                    index === 7 && item.tech_color
                      ? item.tech_color
                      : "inherit",
                }}
              >
                {item.tech_name}
              </span>
              <span className="text-base">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
