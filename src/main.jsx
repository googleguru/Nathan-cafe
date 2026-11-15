import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, BookOpen, ArrowUpRight, Menu, X, Moon, Sun, Sparkles, ShieldCheck, GraduationCap, BrainCircuit, Bot, Network, Atom, SlidersHorizontal, ChevronDown, Library, Mail, Code, Phone, UserRound } from 'lucide-react';
import { courses } from './courses';
import './styles.css';

const disciplines = [
  {name:'All courses', icon:Library, note:'Explore the complete catalogue'},
  {name:'Computer Science', icon:BrainCircuit, note:'AI, data science and cybersecurity'},
  {name:'Faculty Development', icon:GraduationCap, note:'Teaching, assessment and IPR'},
  {name:'Humanities & Social Sciences', icon:Sparkles, note:'Psychology and wellbeing'},
  {name:'Management', icon:Network, note:'IPR, HR and organisational development'},
  {name:'Robotics', icon:Bot, note:'Robotics, sensors and intelligent systems'}
];
const contact = {name:'Dr. V. Vaithianathan', email:'vnathanssn@gmail.com', phone:'+91 99625 74214', tel:'+919962574214'};
const iconFor = (name) => ({'Computer Science':BrainCircuit,'Faculty Development':GraduationCap,'Humanities & Social Sciences':Sparkles,'Management':Network,'Robotics':Bot}[name] || BookOpen);

function App(){
  const [query,setQuery]=useState('');
  const [discipline,setDiscipline]=useState('All courses');
  const [session,setSession]=useState('All sessions');
  const [category,setCategory]=useState('All topics');
  const [dark,setDark]=useState(false);
  const [mobile,setMobile]=useState(false);
  const [selected,setSelected]=useState(null);
  const [page,setPage]=useState(1);
  const [contactOpen,setContactOpen]=useState(false);
  const openContact=()=>{setMobile(false);setContactOpen(true)};
  const pageSize=9;
  const categories=useMemo(()=>['All topics',...new Set(courses.map(c=>c.category))],[ ]);
  const filtered=useMemo(()=>courses.filter(c=>{
    const q=query.toLowerCase().trim();
    return (discipline==='All courses'||c.discipline===discipline)
      && (session==='All sessions'||c.session===session||c.session==='Both')
      && (category==='All topics'||c.category===category)
      && (!q||[c.title,c.description,c.category,c.discipline].join(' ').toLowerCase().includes(q));
  }),[query,discipline,session,category]);
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));
  const shown=filtered.slice((page-1)*pageSize,page*pageSize);
  const chooseDiscipline=(d)=>{setDiscipline(d);setPage(1);setMobile(false);setSelected(null)};
  const chooseSession=(s)=>{setSession(s);setPage(1)};
  const chooseCategory=(s)=>{setCategory(s);setPage(1)};
  return <div className={dark?'app dark':'app'}>
    <header className="topbar">
      <a className="brand" href="#" onClick={()=>{setSelected(null);chooseDiscipline('All courses')}}>
        <span className="brand-mark"><Sparkles size={19}/></span>
        <span><strong>Nexa Learn</strong><small>Nathan's Knowledge Cafe</small></span>
      </a>
      <nav className="toplinks"><a href="#catalogue">Explore</a><a href="#about">About</a><a href="#learning">Learning paths</a></nav>
      <div className="top-actions"><button className="icon-btn" aria-label="Toggle theme" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="signin" onClick={openContact}>Contact <ArrowUpRight size={15}/></button><button className="icon-btn mobile-menu" aria-label="Open menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></div>
    </header>
    {mobile&&<div className="mobile-nav"><a href="#catalogue" onClick={()=>setMobile(false)}>Explore courses</a><a href="#about" onClick={()=>setMobile(false)}>About</a><button className="mobile-contact" onClick={openContact}>Contact</button></div>}
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"></span> A space for curious minds</div>
          <h1>Knowledge that moves<br/><em>you forward.</em></h1>
          <p>Explore thoughtfully curated learning across artificial intelligence, computer science, cybersecurity, faculty development, management and robotics.</p>
          <div className="hero-actions"><a className="primary-btn" href="#catalogue">Explore courses <ArrowUpRight size={17}/></a><a className="text-btn" href="#about">Discover the cafe <span>→</span></a></div>
          <div className="hero-proof"><div className="proof-icons"><span>AI</span><span>CS</span><span>R</span></div><span>Learn with purpose. Build with confidence.</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract learning network illustration">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="art-core"><BrainCircuit size={52} strokeWidth={1.25}/><span>IDEAS<br/>IN MOTION</span></div>
          <div className="float-card card-ai"><BrainCircuit size={17}/><span>Artificial Intelligence</span></div>
          <div className="float-card card-data"><Network size={17}/><span>Data & Discovery</span></div>
          <div className="float-card card-robot"><Bot size={17}/><span>Robotics</span></div>
          <div className="spark s1">✳</div><div className="spark s2">✦</div><div className="spark s3">·</div>
        </div>
      </section>
      <section className="trust-strip"><div><ShieldCheck size={18}/><span>Security-conscious by design</span></div><div><BookOpen size={18}/><span>Curated academic catalogue</span></div><div><Sparkles size={18}/><span>Built for lifelong learning</span></div></section>
      <section className="catalogue" id="catalogue">
        <div className="section-head"><div><div className="eyebrow muted">THE KNOWLEDGE LIBRARY</div><h2>Find your next <em>breakthrough.</em></h2><p>Browse the catalogue and choose a direction for your learning journey.</p></div><div className="count-pill"><strong>{filtered.length}</strong> courses</div></div>
        <div className="catalogue-layout">
          <aside className="sidebar"><div className="side-title">DISCIPLINES</div>{disciplines.map(({name,icon:Icon,note})=><button key={name} className={'discipline '+(discipline===name?'active':'')} onClick={()=>chooseDiscipline(name)}><Icon size={18}/><span>{name}<small>{note}</small></span></button>)}<div className="side-divider"></div><div className="side-title">TOPIC</div><div className="select-wrap"><select value={category} onChange={e=>chooseCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={15}/></div></aside>
          <div className="course-area">
            <div className="filters"><label className="searchbox"><Search size={18}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search courses, skills or topics..." aria-label="Search courses"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label><div className="session-tabs">{['All sessions','January','July'].map(s=><button key={s} onClick={()=>chooseSession(s)} className={session===s?'chosen':''}>{s==='All sessions'?'All':s}</button>)}</div></div>
            <div className="results-line"><span>{filtered.length?`Showing ${(page-1)*pageSize+1}–${Math.min(page*pageSize,filtered.length)} of ${filtered.length} courses`:'No matching courses'}</span><span className="sort-label"><SlidersHorizontal size={14}/> Curated catalogue</span></div>
            {shown.length?<div className="course-grid">{shown.map(course=>{const Icon=iconFor(course.discipline);return <article className="course-card" key={course.id}><div className="course-top"><span className="course-icon"><Icon size={20}/></span><span className="course-session">{course.session==='Both'?'JAN + JUL':course.session.toUpperCase()}</span></div><div className="course-category">{course.discipline} <span>·</span> {course.category}</div><h3>{course.title}</h3><p>{course.description}</p><button className="course-link" onClick={()=>setSelected(course)}>Course overview <ArrowUpRight size={16}/></button></article>})}</div>:<div className="empty"><Search size={26}/><h3>No courses found</h3><p>Try another search term or clear one of the filters.</p><button className="primary-btn" onClick={()=>{setQuery('');chooseDiscipline('All courses');chooseSession('All sessions');chooseCategory('All topics')}}>Clear filters</button></div>}
            {pages>1&&<div className="pagination"><button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page===pages} onClick={()=>setPage(page+1)}>Next</button></div>}
          </div>
        </div>
      </section>
      <section className="learning" id="learning"><div><div className="eyebrow muted">LEARNING, CONNECTED</div><h2>One platform.<br/><em>Many possibilities.</em></h2><p>Build foundations, explore advanced ideas and connect knowledge to practical challenges.</p></div><div className="learning-cards"><div><span className="mini-icon"><BrainCircuit/></span><h3>Explore emerging tech</h3><p>Artificial intelligence, machine learning, data science and cybersecurity.</p></div><div><span className="mini-icon"><GraduationCap/></span><h3>Strengthen teaching</h3><p>Pedagogy, assessment, technical communication and faculty development.</p></div><div><span className="mini-icon"><Bot/></span><h3>Build intelligent systems</h3><p>Robotics, sensors, actuators and engineering applications.</p></div></div></section>
      <section className="about" id="about"><div className="about-symbol"><Atom size={42}/></div><div><div className="eyebrow">ABOUT THE CAFE</div><h2>Curiosity is the beginning<br/>of every great idea.</h2><p>Nathan's Knowledge Cafe brings together structured courses and interdisciplinary learning resources in one accessible destination. The platform is designed to support students, educators, researchers and professionals as they keep learning and creating.</p></div></section>
    </main>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Sparkles size={18}/></span><span><strong>Nexa Learn</strong><small>Nathan's Knowledge Cafe</small></span></a><span>© {new Date().getFullYear()} Nathan's Knowledge Cafe. All rights reserved.</span><div><button className="footer-contact" onClick={openContact}><Mail size={16}/> Contact</button><a href="https://github.com/googleguru/Nathan-cafe"><Code size={16}/> GitHub</a></div></footer>
    {selected&&<div className="modal-backdrop" role="presentation" onClick={()=>setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X/></button><div className="eyebrow muted">{selected.discipline} · {selected.category}</div><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p><div className="modal-meta"><span>{selected.session==='Both'?'January and July sessions':selected.session+' session'}</span><span>Course information</span></div><p className="modal-note">Course enrolment, fees, instructor details and learning materials will be published after the course administrator adds verified information.</p><a className="primary-btn" href={`mailto:${contact.email}?subject=${encodeURIComponent('Course enquiry: '+selected.title)}`}>Enquire about this course <ArrowUpRight size={16}/></a></section></div>}
    {contactOpen&&<div className="modal-backdrop" role="presentation" onClick={()=>setContactOpen(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setContactOpen(false)} aria-label="Close"><X/></button><div className="eyebrow muted">Contact</div><h2 id="contact-title">Get in touch</h2><ul className="contact-list"><li><UserRound size={18}/><span><small>Name</small>{contact.name}</span></li><li><Mail size={18}/><span><small>Email</small><a href={`mailto:${contact.email}`}>{contact.email}</a></span></li><li><Phone size={18}/><span><small>Mobile</small><a href={`tel:${contact.tel}`}>{contact.phone}</a></span></li></ul><a className="primary-btn" href={`mailto:${contact.email}`}>Send an email <ArrowUpRight size={16}/></a></section></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
