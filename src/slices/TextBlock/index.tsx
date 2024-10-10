import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="max-w-prose">
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
