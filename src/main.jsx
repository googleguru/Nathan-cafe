import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Moon, Sun, ChevronDown, Mail, Phone } from 'lucide-react';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk';
import { courses } from './courses';
import './styles.css';

const contact = {name:'Dr. V. Vaithianathan', email:'vnathanssn@gmail.com', phone:'+91 99625 74214', tel:'+919962574214'};

const disciplines = [
  {name:'Computer Science', note:'Artificial intelligence, machine learning, data science and cybersecurity.'},
  {name:'Faculty Development', note:'Pedagogy, assessment, technical writing and intellectual property.'},
  {name:'Humanities & Social Sciences', note:'Psychology, behaviour and wellbeing.'},
  {name:'Management', note:'Intellectual property, human resources and organisational development.'},
  {name:'Robotics', note:'Robotic systems, sensors, actuators and engineering applications.'}
];
const countBy = (key) => courses.reduce((m,c)=>(m[c[key]]=(m[c[key]]||0)+1,m),{});
const disciplineCounts = countBy('discipline');
const subjects = [...new Set(courses.map(c=>c.category))];
const sessionLabel = (s) => s==='Both' ? 'January & July' : s;
const pad = (n) => String(n).padStart(2,'0');

function App(){
  const [query,setQuery]=useState('');
  const [discipline,setDiscipline]=useState('All');
  const [session,setSession]=useState('All');
  const [category,setCategory]=useState('All subjects');
  const [dark,setDark]=useState(false);
  const [mobile,setMobile]=useState(false);
  const [selected,setSelected]=useState(null);
  const [contactOpen,setContactOpen]=useState(false);
  const [page,setPage]=useState(1);
  const pageSize=9;

  const filtered=useMemo(()=>courses.filter(c=>{
    const q=query.toLowerCase().trim();
    return (discipline==='All'||c.discipline===discipline)
      && (session==='All'||c.session===session||c.session==='Both')
      && (category==='All subjects'||c.category===category)
      && (!q||[c.title,c.description,c.category,c.discipline].join(' ').toLowerCase().includes(q));
  }),[query,discipline,session,category]);
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));
  const shown=filtered.slice((page-1)*pageSize,page*pageSize);

  const reset=(fn)=>(v)=>{fn(v);setPage(1)};
  const chooseDiscipline=reset(setDiscipline), chooseSession=reset(setSession), chooseCategory=reset(setCategory);
  const openContact=()=>{setMobile(false);setContactOpen(true)};
  const clearAll=()=>{setQuery('');setDiscipline('All');setSession('All');setCategory('All subjects');setPage(1)};
  const goToCatalogue=(d)=>{clearAll();if(d)setDiscipline(d);document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth'})};
  const turnPage=(p)=>{setPage(p);document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth'})};

  useEffect(()=>{
    const onKey=(e)=>{if(e.key==='Escape'){setSelected(null);setContactOpen(false)}};
    window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[]);
  useEffect(()=>{document.documentElement.style.colorScheme=dark?'dark':'light'},[dark]);

  return <div className={dark?'app dark':'app'}>
    <header className="topbar">
      <a className="brand" href="#top" onClick={()=>setMobile(false)}>
        <span className="monogram" aria-hidden="true">N</span>
        <span className="wordmark"><strong>Nathan’s Knowledge Cafe</strong><small>Nexa Learn</small></span>
      </a>
      <nav className="toplinks" aria-label="Primary"><a href="#catalogue">Catalogue</a><a href="#disciplines">Disciplines</a><a href="#about">About</a></nav>
      <div className="top-actions">
        <button className="icon-btn" aria-label={dark?'Switch to light theme':'Switch to dark theme'} onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
        <button className="contact-btn" onClick={openContact}>Contact</button>
        <button className="icon-btn mobile-menu" aria-label="Menu" aria-expanded={mobile} onClick={()=>setMobile(!mobile)}>{mobile?<X size={19}/>:<Menu size={19}/>}</button>
      </div>
    </header>
    {mobile&&<nav className="mobile-nav" aria-label="Mobile"><a href="#catalogue" onClick={()=>setMobile(false)}>Catalogue</a><a href="#disciplines" onClick={()=>setMobile(false)}>Disciplines</a><a href="#about" onClick={()=>setMobile(false)}>About</a><button onClick={openContact}>Contact</button></nav>}

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Course catalogue · January &amp; July sessions</p>
          <h1>A reading room for <em>curious</em> minds.</h1>
          <p className="lede">A considered selection of courses in computing, teaching practice, the social sciences, management and robotics — chosen for learners who want depth rather than noise.</p>
          <div className="hero-actions">
            <a className="btn btn-ink" href="#catalogue">Browse the catalogue <ArrowRight size={17}/></a>
            <button className="btn btn-line" onClick={openContact}>Speak with us</button>
          </div>
        </div>
        <aside className="ledger" aria-label="Catalogue at a glance">
          <p className="ledger-title">At a glance</p>
          <dl>
            <div><dt>Courses</dt><dd>{courses.length}</dd></div>
            <div><dt>Disciplines</dt><dd>{pad(disciplines.length)}</dd></div>
            <div><dt>Subjects</dt><dd>{subjects.length}</dd></div>
            <div><dt>Sessions a year</dt><dd>02</dd></div>
          </dl>
          <button className="ledger-foot" onClick={openContact}><span>Enquiries</span><strong>{contact.name}</strong><ArrowUpRight size={16}/></button>
        </aside>
      </section>

      <section className="disciplines" id="disciplines">
        <div className="section-head">
          <p className="kicker">Fields of study</p>
          <h2>Five disciplines, <em>one library.</em></h2>
        </div>
        <ol className="discipline-index">
          {disciplines.map((d,i)=><li key={d.name}><button onClick={()=>goToCatalogue(d.name)}>
            <span className="d-num">{pad(i+1)}</span>
            <span className="d-name">{d.name}</span>
            <span className="d-note">{d.note}</span>
            <span className="d-count">{disciplineCounts[d.name]} courses <ArrowRight size={16}/></span>
          </button></li>)}
        </ol>
      </section>

      <section className="catalogue" id="catalogue">
        <div className="section-head row">
          <div><p className="kicker">The catalogue</p><h2>Find your next <em>course.</em></h2></div>
          <p className="count"><strong>{filtered.length}</strong> of {courses.length} courses</p>
        </div>
        <div className="catalogue-layout">
          <aside className="filters" aria-label="Filters">
            <label className="search"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search by title or topic" aria-label="Search courses"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label>
            <div className="filter-group">
              <p className="filter-label">Session</p>
              <div className="segmented">{['All','January','July'].map(s=><button key={s} className={session===s?'on':''} onClick={()=>chooseSession(s)}>{s}</button>)}</div>
            </div>
            <div className="filter-group">
              <p className="filter-label">Discipline</p>
              <ul className="discipline-filter">
                <li><button className={discipline==='All'?'on':''} onClick={()=>chooseDiscipline('All')}><span>All disciplines</span><span>{courses.length}</span></button></li>
                {disciplines.map(d=><li key={d.name}><button className={discipline===d.name?'on':''} onClick={()=>chooseDiscipline(d.name)}><span>{d.name}</span><span>{disciplineCounts[d.name]}</span></button></li>)}
              </ul>
            </div>
            <div className="filter-group">
              <p className="filter-label">Subject</p>
              <div className="select"><select value={category} onChange={e=>chooseCategory(e.target.value)} aria-label="Subject">{['All subjects',...subjects].map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={15}/></div>
            </div>
          </aside>
          <div className="results">
            {shown.length?<div className="course-grid">{shown.map(course=><article className="course" key={course.id}>
              <button onClick={()=>setSelected(course)} aria-label={`Open overview of ${course.title}`}>
                <span className="course-meta"><span className="course-no">No. {pad(course.id)}</span><span>{sessionLabel(course.session)}</span></span>
                <span className="course-field">{course.discipline} — {course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span className="course-more">Overview <ArrowUpRight size={15}/></span>
              </button>
            </article>)}</div>
            :<div className="empty"><h3>Nothing matches that search.</h3><p>Try a broader term, or clear the filters to see the full catalogue.</p><button className="btn btn-line" onClick={clearAll}>Clear filters</button></div>}
            {pages>1&&<nav className="pagination" aria-label="Pages">
              <button disabled={page===1} onClick={()=>turnPage(page-1)}><ArrowLeft size={15}/> Previous</button>
              <span><em>{page}</em> of {pages}</span>
              <button disabled={page===pages} onClick={()=>turnPage(page+1)}>Next <ArrowRight size={15}/></button>
            </nav>}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <blockquote>Curiosity is the beginning of every great idea.</blockquote>
        <div className="about-copy">
          <p className="kicker">About the cafe</p>
          <p>Nathan’s Knowledge Cafe gathers structured courses and interdisciplinary learning resources in one quiet, accessible place. It is meant for students, educators, researchers and working professionals who want to keep learning — and to put what they learn to use.</p>
          <p>Every course in the catalogue runs in the January session, the July session, or both. For questions about a course or the cafe, write or call directly.</p>
          <button className="btn btn-line" onClick={openContact}>Get in touch <ArrowUpRight size={16}/></button>
        </div>
      </section>
    </main>

    <footer>
      <div className="footer-top">
        <div className="footer-brand"><span className="monogram" aria-hidden="true">N</span><p>Nathan’s Knowledge Cafe<small>Nexa Learn</small></p></div>
        <div className="footer-col"><p className="filter-label">Explore</p><a href="#catalogue">Catalogue</a><a href="#disciplines">Disciplines</a><a href="#about">About</a><a href="https://github.com/googleguru/Nathan-cafe">Source on GitHub</a></div>
        <div className="footer-col"><p className="filter-label">Correspondence</p><span>{contact.name}</span><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`tel:${contact.tel}`}>{contact.phone}</a></div>
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Nathan’s Knowledge Cafe. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
    </footer>

    {selected&&<div className="overlay" role="presentation" onClick={()=>setSelected(null)}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="course-title" onClick={e=>e.stopPropagation()}>
      <button className="sheet-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={19}/></button>
      <p className="kicker">No. {pad(selected.id)} · {selected.discipline}</p>
      <h2 id="course-title">{selected.title}</h2>
      <p className="sheet-lede">{selected.description}</p>
      <dl className="sheet-facts"><div><dt>Subject</dt><dd>{selected.category}</dd></div><div><dt>Session</dt><dd>{sessionLabel(selected.session)}</dd></div></dl>
      <p className="sheet-note">Enrolment details, fees, instructors and materials will be published once the course administrator confirms them.</p>
      <a className="btn btn-ink" href={`mailto:${contact.email}?subject=${encodeURIComponent('Course enquiry: '+selected.title)}`}>Enquire about this course <ArrowUpRight size={16}/></a>
    </section></div>}

    {contactOpen&&<div className="overlay" role="presentation" onClick={()=>setContactOpen(false)}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={e=>e.stopPropagation()}>
      <button className="sheet-close" onClick={()=>setContactOpen(false)} aria-label="Close"><X size={19}/></button>
      <p className="kicker">Contact</p>
      <h2 id="contact-title">{contact.name}</h2>
      <p className="sheet-lede">For course enquiries, sessions and anything else about the cafe.</p>
      <ul className="contact-list">
        <li><Mail size={17}/><span><small>Email</small><a href={`mailto:${contact.email}`}>{contact.email}</a></span></li>
        <li><Phone size={17}/><span><small>Mobile</small><a href={`tel:${contact.tel}`}>{contact.phone}</a></span></li>
      </ul>
      <a className="btn btn-ink" href={`mailto:${contact.email}`}>Write an email <ArrowUpRight size={16}/></a>
    </section></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
