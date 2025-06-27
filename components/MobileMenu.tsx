import { MobileMenuProps } from "@/types";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  darkMode,
  scrollToBlog,
  setIsModalOpen,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`absolute right-0 h-full w-64 ${
          darkMode ? "bg-gray-900" : "bg-white"
        } shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer self-end text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="mt-8 space-y-6">
            <button
              onClick={() => {
                scrollToBlog();
                setIsOpen(false);
              }}
              className={`cursor-pointer block w-full text-left px-4 py-2 text-lg font-medium ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-900 hover:bg-gray-100"
              } rounded-lg transition-colors duration-200`}
            >
              Blogs
            </button>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className={`cursor-pointer block w-full text-left px-4 py-2 text-lg font-medium ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-900 hover:bg-gray-100"
              } rounded-lg transition-colors duration-200`}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
