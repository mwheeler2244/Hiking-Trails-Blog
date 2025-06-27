import { BlogListProps, BlogPost } from "@/types";

export default function BlogList({ posts, onSelect }: BlogListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post: BlogPost) => (
        <article
          key={post.id}
          className="group cursor-pointer pb-8 border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-all duration-300 hover:transform hover:translate-x-2"
          onClick={() => onSelect(post)}
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                {post.topic}
              </span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
