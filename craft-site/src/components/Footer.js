import React from "react";

const links = [
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Privacy", href: "#" },
];

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <rect width="20" height="20" x="2" y="2" rx="5" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M9 8v8a3 3 0 1 0 3-3h-1" />
        <path d="M16 3v2a4 4 0 0 0 4 4h1" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <polygon points="10,9 16,12 10,15" fill="#fff" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        {/* Links */}
        <nav className="flex gap-6 mb-4 md:mb-0">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="hover:underline">
              {link.name}
            </a>
          ))}
        </nav>
        {/* Social Icons */}
        <div className="flex gap-6">
          {socials.map((social) => (
            <a key={social.name} href={social.href} aria-label={social.name} className="hover:text-pink-400">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
} 