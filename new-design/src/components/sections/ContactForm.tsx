import { Link } from "react-router-dom";
import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { company } from "@/content/site";

const empty = { name: "", email: "", company: "", message: "", phone: "" };
type Field = keyof typeof empty;

const fields: { key: Field; label: string; type?: string; required?: boolean; autoComplete?: string; textarea?: boolean }[] = [
  { key: "name", label: "Name", required: true, autoComplete: "name" },
  { key: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { key: "company", label: "Company", required: true, autoComplete: "organization" },
  { key: "message", label: "What are you looking to build?", required: true, textarea: true },
  { key: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
];

export const ContactForm = () => {
  const [data, setData] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const id = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(company.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Website enquiry — ${data.company || data.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setData(empty);
    } catch {
      setStatus("error");
    }
  };

  const input =
    "mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";

  return (
    <form onSubmit={submit} className="panel grid gap-5 p-6 sm:grid-cols-2 sm:p-8" noValidate={false}>
      {fields.map((f) => (
        <div key={f.key} className={f.textarea ? "sm:col-span-2" : f.key === "phone" ? "sm:col-span-2" : ""}>
          <label htmlFor={`${id}-${f.key}`} className="text-sm font-medium text-foreground">
            {f.label}
          </label>
          {f.textarea ? (
            <textarea
              id={`${id}-${f.key}`}
              rows={5}
              required={f.required}
              value={data[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className={`${input} resize-y`}
            />
          ) : (
            <input
              id={`${id}-${f.key}`}
              type={f.type ?? "text"}
              required={f.required}
              autoComplete={f.autoComplete}
              value={data[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className={input}
            />
          )}
        </div>
      ))}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-meta">Used only to respond to your enquiry. See our <Link to="/privacy" className="underline hover:text-foreground">privacy policy</Link>.</p>
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"} <Send size={15} aria-hidden />
        </button>
      </div>
      <p role="status" aria-live="polite" className="text-sm sm:col-span-2 empty:hidden">
        {status === "success" && <span className="text-success">Thank you — your message has been sent. We will be in touch shortly.</span>}
        {status === "error" && (
          <span className="text-destructive">
            Something went wrong. Please try again or email us at {company.email}.
          </span>
        )}
      </p>
    </form>
  );
};
