import { TrailCardProps } from "@/types";

export default function TrailCard({ trail }: TrailCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 h-48">
        <img
          src={trail.image}
          alt={trail.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {trail.name}
          </h3>
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            {trail.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{trail.distance}</span>
          <span>•</span>
          <span>{trail.elevation}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {trail.description}
        </p>
      </div>
    </div>
  );
}
