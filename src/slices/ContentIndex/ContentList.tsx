import { Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import { space } from "postcss/lib/list";
import { MdArrowOutward } from "react-icons/md";

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items,
  contentType,
  fallbackImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  return (
    <div>
      <ul className="grid border-b border-b-slate-100/50">
        {items.map((item, index) => (
          <>
            {isFilled.keyText(item.data.title) && (
              <li key={index} className="opacity-0HOX list-item">
                <Link
                  href={`${urlPrefix}/${item.uid}`}
                  className="flex flex-col justify-between border-t border-t-slate-100/50 py-10 text-slate-200 md:flex-row"
                  aria-label={item.data.title}
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold">
                      {item.data.title}
                    </span>
                    <div className="flex gap-2 text-lg text-yellow-400">
                      {item.tags.map((tag, index) => (
                        <>
                          <span className="first:hidden">|</span>
                          <span key={index}>{tag}</span>
                        </>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                    {viewMoreText}
                    <MdArrowOutward />
                  </span>
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
