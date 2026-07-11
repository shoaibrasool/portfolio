"use client";

import profile from "@/data/profile.json";

export default function ContactPanel() {
  const basic = (profile as { basic: { name: string; title: string; email: string; location: string; available: boolean } }).basic;
  const social = (profile as { social: { github: string; linkedin: string; twitter: string; website: string } }).social;

  const links = [
    { label: "Email", href: `mailto:${basic.email}`, value: basic.email },
    { label: "GitHub", href: `https://github.com/${social.github}`, value: `@${social.github}` },
    { label: "LinkedIn", href: `https://linkedin.com/in/${social.linkedin}`, value: `@${social.linkedin}` },
    ...(social.twitter ? [{ label: "Twitter", href: `https://twitter.com/${social.twitter}`, value: `@${social.twitter}` }] : []),
    ...(social.website ? [{ label: "Website", href: social.website, value: social.website }] : []),
  ].filter(Boolean);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${basic.available ? "bg-success animate-pulse" : "bg-text-muted"}`} />
        <span className="text-sm text-text-secondary">
          {basic.available ? "Available for opportunities" : "Currently unavailable"}
        </span>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-bg-card border border-border
                       hover:border-accent/30 hover:bg-bg-hover transition-all group"
          >
            <span className="text-xs text-text-muted">{link.label}</span>
            <span className="text-sm text-text-primary group-hover:text-accent-light transition-colors">
              {link.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
