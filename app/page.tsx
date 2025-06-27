"use client";
import { useEffect, useState } from "react";
import { Lora } from "next/font/google";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component imports
import ContactForm from "@/components/ContactForm";
import MobileMenu from "@/components/MobileMenu";
import TrailCard from "@/components/TrailCard";
import BlogList from "@/components/BlogList";
import ThemeToggle from "@/components/ThemeToggle";

// Type imports
import { BlogPost, ContactFormData, FormErrors } from "@/types";

// Data imports
import { blogPosts } from "@/data/blogPosts";
import { trailGuides } from "@/data/trailGuides";

const lora = Lora({ subsets: ["latin"], display: "swap" });

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === "true");
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic ? post.topic === selectedTopic : true;
    return matchesSearch && matchesTopic;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: FormErrors = {
      name: contactForm.name ? "" : "Name is required",
      email: !contactForm.email
        ? "Email is required"
        : !emailRegex.test(contactForm.email)
        ? "Invalid email format"
        : "",
      message: contactForm.message ? "" : "Message is required",
    };
    setFormErrors(errors);
    if (!errors.name && !errors.email && !errors.message) {
      console.log("Form submitted:", contactForm);
      toast.success(
        "Message sent successfully! We&apos;ll get back to you soon.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }
  };

  const scrollToBlog = () => {
    const blogSection = document.querySelector("#blogs");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${lora.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <ToastContainer theme={darkMode ? "dark" : "light"} />

      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Alphine Trails</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToBlog}
              className="cursor-pointer text-white hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              Blogs
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer text-white hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              Contact
            </button>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </nav>
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer text-white hover:text-gray-300 transition-colors duration-200"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        darkMode={darkMode}
        scrollToBlog={scrollToBlog}
        setIsModalOpen={setIsModalOpen}
      />

      <section className="relative h-screen bg-gray-900 overflow-hidden">
        <img
          src="https://picsum.photos/2831/1800?random=1"
          alt="Mountain trail at sunrise"
          className={`absolute inset-0 w-full h-full object-cover ${
            darkMode ? "opacity-55" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 dark:from-black/80 dark:to-black/40" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <div className="max-w-2xl text-white">
              <h2
                className={`${lora.className} text-4xl md:text-5xl font-bold mb-4 leading-tight`}
              >
                Find Your Path
              </h2>
              <p
                className={`${lora.className} text-lg text-gray-200 leading-relaxed`}
              >
                Discover the transformative power of hiking through stories,
                guides, and inspiration from the trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? "bg-black text-white"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div
                className={`sticky top-8 space-y-6 ${
                  darkMode
                    ? "bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-xl border border-gray-800/40"
                    : "bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl border border-gray-100"
                } rounded-2xl p-8 shadow-xl transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-1 h-6 rounded-full ${
                          darkMode
                            ? "bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600"
                            : "bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-700"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold tracking-tight ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Search Stories
                    </h3>
                  </div>
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                        darkMode
                          ? "bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-500/5"
                          : "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50"
                      }`}
                    />
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className={`w-full py-2.5 px-4 pr-10 transition-all duration-200 rounded-xl font-medium text-sm ${
                          darkMode
                            ? "bg-gray-800/50 text-white placeholder-gray-400 border-gray-700/50 focus:border-emerald-500/50"
                            : "bg-gray-50/50 text-gray-900 placeholder-gray-500 border-gray-200 focus:border-emerald-500/50"
                        } border focus:outline-none focus:ring-1 focus:ring-emerald-500/30`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className={`w-4 h-4 transition-colors duration-200 ${
                            darkMode
                              ? "text-gray-400 group-hover:text-emerald-400"
                              : "text-gray-400 group-hover:text-emerald-600"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-1 h-6 rounded-full ${
                          darkMode
                            ? "bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-600"
                            : "bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-700"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold tracking-tight ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Categories
                    </h3>
                  </div>
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                        darkMode
                          ? "bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5"
                          : "bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50"
                      }`}
                    />
                    <div className="relative">
                      <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className={`w-full py-2.5 px-4 appearance-none transition-all duration-200 rounded-xl font-medium text-sm ${
                          darkMode
                            ? "bg-gray-800/50 text-white border-gray-700/50 focus:border-blue-500/50"
                            : "bg-gray-50/50 text-gray-900 border-gray-200 focus:border-blue-500/50"
                        } border focus:outline-none focus:ring-1 focus:ring-blue-500/30 cursor-pointer`}
                      >
                        <option value="">All Categories</option>
                        {[...new Set(blogPosts.map((p) => p.topic))].map(
                          (topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          )
                        )}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className={`w-4 h-4 transition-colors duration-200 ${
                            darkMode
                              ? "text-gray-400 group-hover:text-blue-400"
                              : "text-gray-400 group-hover:text-blue-600"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-800/30 via-gray-800/20 to-gray-900/30 border border-gray-700/30"
                      : "bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 border border-gray-200/60"
                  }`}
                >
                  <div className="absolute inset-0">
                    <div
                      className={`w-full h-full ${
                        darkMode
                          ? "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"
                          : "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"
                      }`}
                    />
                  </div>
                  <div className="relative p-6">
                    <div className="text-center space-y-1">
                      <div
                        className={`text-3xl font-bold bg-clip-text text-transparent ${
                          darkMode
                            ? "bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400"
                            : "bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600"
                        }`}
                      >
                        {filteredBlogPosts.length}
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Stories Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-9">
              {selectedPost ? (
                <article className="space-y-8">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className={`group cursor-pointer inline-flex items-center  font-semibold transition-all duration-300 transform hover:scale-105 ${
                      darkMode
                        ? "text-emerald-400 hover:text-emerald-300 "
                        : "text-emerald-600 hover:text-emerald-700  "
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back to Stories
                  </button>

                  <div
                    className={`${
                      darkMode
                        ? "bg-gray-900/30 backdrop-blur-xl border border-gray-800/50"
                        : "bg-white/70 backdrop-blur-xl border border-gray-200/30 shadow-2xl shadow-gray-200/20"
                    } rounded-3xl p-8 lg:p-12 transition-all duration-300`}
                  >
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase ${
                            darkMode
                              ? "bg-gray-900 text-white border border-emerald-500/30"
                              : "bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {selectedPost.topic}
                        </span>

                        <h2
                          className={`text-4xl lg:text-4xl font-black tracking-tight leading-tight ${
                            darkMode
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300"
                              : "text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                          }`}
                        >
                          {selectedPost.title}
                        </h2>

                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center space-x-2 ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-medium">
                              {selectedPost.readTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`prose prose-xl max-w-none ${
                          darkMode ? "prose-invert" : ""
                        } prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline`}
                      >
                        <div
                          className={`text-xl leading-relaxed ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {selectedPost.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ) : (
                <div id="blogs" className="space-y-20">
                  <div className="space-y-8">
                    <div className="text-center lg:text-left space-y-4">
                      <h2
                        className={`text-4xl lg:text-5xl font-black tracking-tight ${
                          darkMode
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300"
                            : "text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                        }`}
                      >
                        Latest Stories
                      </h2>

                      <div
                        className={`w-24 h-1 rounded-full mx-auto lg:mx-0 ${
                          darkMode
                            ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                            : "bg-gradient-to-r from-emerald-500 to-teal-600"
                        }`}
                      ></div>
                    </div>

                    <BlogList
                      posts={filteredBlogPosts}
                      onSelect={setSelectedPost}
                    />
                  </div>

                  <div id="trail-guides" className="space-y-8">
                    <div className="text-center space-y-6">
                      <h2
                        className={`text-4xl lg:text-5xl font-black tracking-tight ${
                          darkMode
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300"
                            : "text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                        }`}
                      >
                        Featured Trail Guides
                      </h2>
                      <div
                        className={`w-24 h-1 rounded-full mx-auto ${
                          darkMode
                            ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600"
                        }`}
                      ></div>
                      <p
                        className={`text-xl leading-relaxed max-w-2xl mx-auto ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Carefully curated hiking routes with detailed
                        information and expert insights for adventurers of all
                        levels.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {trailGuides.map((trail) => (
                        <TrailCard key={trail.id} trail={trail} />
                      ))}
                    </div>
                  </div>

                  <div
                    id="contact"
                    className={`relative overflow-hidden rounded-3xl p-12 lg:p-16 text-center ${
                      darkMode
                        ? "bg-gray-900 text-white border border-gray-700/50"
                        : "bg-white border border-gray-200/50"
                    }`}
                  >
                    <div className="relative space-y-6">
                      <h3
                        className={`text-3xl lg:text-4xl font-bold ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        Ready to Share Your Story?
                      </h3>
                      <p
                        className={`text-xl ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        } max-w-2xl mx-auto`}
                      >
                        Join our community of adventurers and storytellers.
                        Start a conversation today.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className={`group cursor-pointer inline-flex items-center px-10 py-4 ${
                          darkMode
                            ? "text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 "
                            : "text-black   text-lg font-bold  transition-all duration-300 transform hover:scale-105 "
                        }`}
                      >
                        <span>Start a Conversation</span>
                        <svg
                          className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <ContactForm
          contactForm={contactForm}
          setContactForm={setContactForm}
          formErrors={formErrors}
          onSubmit={handleContactSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <footer
        className={`border-t ${
          darkMode ? "bg-black" : "bg-white text-gray-900"
        } border-gray-200`}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Alpine Trails
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Inspiring outdoor adventures and connecting hikers with
                nature&apos;s most beautiful trails.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.twitter.com/alpine_trails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:scale-110 transition-colors"
                >
                  <span className="sr-only">X</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/alpine_trails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:scale-110 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/alpine_trails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:scale-110 "
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } uppercase tracking-wider mb-4`}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#blogs"
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#trail-guides"
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Trail Guides
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setIsModalOpen(true)}
                    className={`cursor-pointer text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } uppercase tracking-wider mb-4`}
              >
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      toast.success("Coming soon!");
                    }}
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Trail Maps
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      toast.success("Coming soon!");
                    }}
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Weather Updates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      toast.success("Coming soon!");
                    }}
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Community Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      toast.success("Coming soon!");
                    }}
                    className={`text-base ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } hover:text-green-500 dark:hover:text-green-400 transition-colors`}
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } uppercase tracking-wider mb-4`}
              >
                Stay Updated
              </h3>
              <p
                className={`text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } mb-4`}
              >
                Subscribe to our newsletter for the latest trail updates and
                outdoor tips.
              </p>
              <form className="space-y-2">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    required
                    className={`w-full px-4 py-2 text-base text-gray-900 ${
                      darkMode
                        ? "bg-gray-300 text-white"
                        : "bg-white border border-gray-300  text-gray-900"
                    } placeholder-gray-500 rounded-lg ${
                      darkMode ? "placeholder-gray-400" : ""
                    } `}
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  onClick={() => {
                    const emailInput = document.getElementById(
                      "email-address"
                    ) as HTMLInputElement;
                    const email = emailInput?.value;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!email) {
                      toast.error("Please enter your email address");
                      return;
                    }

                    if (!emailRegex.test(email)) {
                      toast.error("Please enter a valid email address");
                      return;
                    }

                    toast.success("Successfully subscribed to our newsletter!");
                    emailInput.value = "";
                  }}
                  className={`cursor-pointer w-full px-4 py-2 text-base font-medium text-white ${
                    darkMode
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-black hover:bg-gray-700"
                  } rounded-lg transition-colors duration-200`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p
                className={`text-base ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                © 2025 Alpine Trails. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  rel="noopener noreferrer"
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Privacy Policy
                </a>
                <a
                  rel="noopener noreferrer"
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } `}
                >
                  Terms of Service
                </a>
                <a
                  rel="noopener noreferrer"
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } `}
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
