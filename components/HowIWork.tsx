const steps = [
  {
    number: "01",
    title: "I own the outcome",
    description:
      "Give me the problem, not a task list. I find the path, flag risks early, and ship — you don't chase me.",
  },
  {
    number: "02",
    title: "Context before code",
    description:
      "I read everything — the repo, the tickets, the Slack thread where the real requirement is hiding. Most bad decisions are just missing context dressed up as a deadline.",
  },
  {
    number: "03",
    title: "Options, not one answer",
    description:
      "I show up with a map: three ways to do this, what each one costs, which one I'd pick and why. The reasoning outlives the code.",
  },
  {
    number: "04",
    title: "Judgment over hours",
    description:
      "The right decision made once beats the wrong one made fast and then unwound for months. I define scope and rate upfront — no surprises.",
  },
];

export default function HowIWork() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {steps.map((step) => (
        <div key={step.number} className="p-5 rounded-xl glass border border-border">
          <span className="text-[10px] font-mono tracking-[0.2em] text-accent">
            {step.number}
          </span>
          <h3 className="text-sm font-medium text-text-primary mt-2 mb-2">
            {step.title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
