"use client";

import { useState, useEffect } from "react";
import { profile, about, skills, education, projects } from "./data";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
    const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved || system);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n- ${form.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <header>
        <div className="wrap">
          <nav>
            <a className="logo" href="#top">{profile.initials}</a>
            <button id="menuBtn" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
            <ul className={open ? "open" : ""} onClick={() => setOpen(false)}>
              {links.map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
                        </ul>
            <button className="themeBtn" onClick={toggleTheme} aria-label="Toggle dark or light mode">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </nav>
    
        </div>
      </header>

      <main>
        <section id="top">
          <div className="wrap hero">
            <div>
              <h1>Turning data and code into useful, user-focused solutions.</h1>
              <p className="sub">
                Hi, I'm <b>{profile.name}</b>, a B.Tech CSE (AI &amp; ML) student and aspiring AI/ML and
                software developer. I work with Python, machine learning and React.js to build practical,
                user-focused projects.
              </p>
              <a className="btn primary" href="#contact">Contact Me →</a>
              <a className="btn" href="/resume.pdf" download>My Resume ↓</a>
            </div>
            <div className="photo">
  <img src="/photo.jpeg" alt="Varaprasad Mupparaju" />
</div>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <h2>About</h2>
            <p className="sub">A little about what I do</p>
            <div className="grid">
              {about.map((a) => (
                <div className="card" key={a.title}><h3>{a.title}</h3><p>{a.text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <h2>Skills</h2>
            <p className="sub">Tools I work with</p>
            <div className="tags">
              {skills.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
        </section>

        <section id="education">
          <div className="wrap">
            <h2>Education &amp; Certifications</h2>
            <p className="sub">Where I study and what I've learned</p>
            <div className="grid">
              {education.map((e) => (
                <div className="card" key={e.name}><h3>{e.name}</h3><p>{e.info}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <h2>Projects</h2>
            <p className="sub">Personal and academic projects</p>
            <div className="grid">
              {projects.map((p, i) => (
                <a className="card" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
                  <h3>0{i + 1} {p.name}</h3>
                  <p>{p.desc}</p>
                  <p className="stack">{p.stack}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <h2>Get In Touch</h2>
            <p className="sub">Have a question or want to work together?</p>
            <form onSubmit={onSubmit}>
              <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
              <input name="subject" placeholder="Subject" value={form.subject} onChange={onChange} required />
              <textarea name="message" rows={4} placeholder="Message" value={form.message} onChange={onChange} required />
              <button className="send" type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} {profile.name} · {profile.email} · {profile.location}</p>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </>
  );
}