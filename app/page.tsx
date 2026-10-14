"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Property = { id: number; name: string; area: string; price: string; beds: string; size: string; image: string; type: "Buy" | "Rent" | "Off-plan"; tag?: string };

const properties: Property[] = [
  { id: 1, name: "Skyline residence", area: "Downtown Dubai", price: "AED 4,850,000", beds: "2 beds", size: "1,438 sq ft", image: "photo-1600607687939-ce8a6c25118c", type: "Buy", tag: "Exclusive" },
  { id: 2, name: "The Palm Collection", area: "Palm Jumeirah", price: "AED 12,500,000", beds: "4 beds", size: "3,220 sq ft", image: "photo-1600607687920-4e2a09cf159d", type: "Buy", tag: "Waterfront" },
  { id: 3, name: "A quiet kind of luxury", area: "Dubai Hills Estate", price: "AED 265,000 / year", beds: "3 beds", size: "2,114 sq ft", image: "photo-1600566753086-00f18fb6b3ea", type: "Rent", tag: "Just listed" },
  { id: 4, name: "A life above it all", area: "Business Bay", price: "AED 2,100,000", beds: "1 bed", size: "862 sq ft", image: "photo-1600607687644-c7171b42498f", type: "Off-plan", tag: "New launch" },
  { id: 5, name: "Garden House", area: "Al Barari", price: "AED 8,900,000", beds: "5 beds", size: "5,460 sq ft", image: "photo-1600210492486-724fe5c67fb0", type: "Buy" },
  { id: 6, name: "The Address Residences", area: "Dubai Marina", price: "AED 180,000 / year", beds: "2 beds", size: "1,260 sq ft", image: "photo-1600566753190-17f0baa2a6c3", type: "Rent" },
];

const areas = [
  { name: "Palm Jumeirah", note: "Island living, reimagined", image: "photo-1512453979798-5ea266f8880c" },
  { name: "Downtown Dubai", note: "At the heart of it all", image: "photo-1519501025264-65ba15a82390" },
  { name: "Dubai Hills Estate", note: "Room to grow, space to breathe", image: "photo-1600596542815-ffad4c1539a9" },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "search") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 8.7c0 4.6-8.8 10-8.8 10S3.2 13.3 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"/></svg>;
  if (name === "arrow") return <svg {...common}><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>;
  if (name === "chevron") return <svg {...common}><path d="m7 10 5 5 5-5"/></svg>;
  if (name === "menu") return <svg {...common}><path d="M3 7h18M3 12h18M3 17h18"/></svg>;
  return <svg {...common}><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.2"/></svg>;
}

export default function Home() {
  const [listingType, setListingType] = useState<"Buy" | "Rent" | "Off-plan">("Buy");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(() => properties.filter((p) => p.type === listingType && `${p.name} ${p.area}`.toLowerCase().includes(search.toLowerCase()) && (!location || p.area.toLowerCase().includes(location.toLowerCase()))), [listingType, location, search]);

  const goToListings = () => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="APR NEXT home"><Image className="brand-logo" src="/images/are-next-logo.jpeg" alt="APR NEXT — Affordable Plus Realty" width={1536} height={1024} priority /></a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#properties">Properties <Icon name="chevron" size={13}/></a><a href="#areas">Communities <Icon name="chevron" size={13}/></a><a href="#approach">Our approach</a><a href="#journal">Journal</a>
        </nav>
        <div className="header-actions"><a className="phone-link" href="tel:+971558451513">+971 55 845 1513</a><a className="header-cta" href="#contact">Let’s talk <Icon name="arrow" size={15}/></a></div>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMobileMenu(!mobileMenu)}><Icon name="menu"/></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow light"><span/> A MORE CONSIDERED WAY TO FIND HOME</div>
          <h1>Find your place<br/>in the <em>extraordinary.</em></h1>
          <p>Exceptional homes. Enduring value.<br/>A little more feeling in every detail.</p>
          <button className="text-link light-link" onClick={goToListings}>Explore our collection <Icon name="arrow" size={17}/></button>
        </div>
        <div className="hero-note"><span>01 / 03</span><i/> PALM JUMEIRAH · DUBAI</div>
        <div className="search-panel">
          <div className="search-tabs">{(["Buy", "Rent", "Off-plan"] as const).map((item) => <button key={item} className={listingType === item ? "active" : ""} onClick={() => setListingType(item)}>{item === "Off-plan" ? "Off-plan" : `For ${item.toLowerCase()}`}</button>)}</div>
          <form className="search-form" onSubmit={(e) => { e.preventDefault(); goToListings(); }}>
            <label className="search-field location-field"><span>LOCATION</span><div><Icon name="pin" size={17}/><select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Select location"><option value="">All Dubai</option><option>Downtown Dubai</option><option>Palm Jumeirah</option><option>Dubai Hills Estate</option><option>Business Bay</option><option>Dubai Marina</option><option>Al Barari</option></select></div></label>
            <label className="search-field"><span>PROPERTY TYPE</span><select aria-label="Property type"><option>All properties</option><option>Apartments</option><option>Villas</option><option>Penthouses</option><option>Townhouses</option></select></label>
            <label className="search-field"><span>PRICE RANGE</span><select aria-label="Price range"><option>Any price</option><option>AED 1M – 3M</option><option>AED 3M – 7M</option><option>AED 7M+</option></select></label>
            <button className="search-button" type="submit"><Icon name="search" size={18}/><span>Find a home</span></button>
          </form>
        </div>
      </section>

      <section className="intro section-wrap" id="approach">
        <div className="intro-label"><span className="eyebrow"><span/> THE APR NEXT DIFFERENCE</span></div>
        <div className="intro-copy"><h2>A home is more than<br/>an <em>address.</em></h2><div className="intro-right"><p>It’s the light at the end of the day. The neighborhood that knows your name. The feeling that, somehow, you’ve arrived. We help you find the place where it all comes together.</p><a className="text-link dark-link" href="#contact">Get to know us <Icon name="arrow" size={17}/></a></div></div>
        <div className="stats"><div><strong>12<span>+</span></strong><small>YEARS IN DUBAI</small></div><div><strong>2.4<span>B</span></strong><small>PROPERTY SOLD · AED</small></div><div><strong>98<span>%</span></strong><small>CLIENTS BY REFERRAL</small></div><div className="stats-note">Rooted in Dubai.<br/><em>Here for what’s next.</em></div></div>
      </section>

      <section className="properties-section" id="properties">
        <div className="section-wrap">
          <div className="section-heading"><div><span className="eyebrow"><span/> THE COLLECTION</span><h2>Homes with <em>character.</em></h2></div><a href="#contact" className="text-link dark-link desktop-link">View all properties <Icon name="arrow" size={17}/></a></div>
          <div className="listing-controls"><div className="listing-tabs">{(["Buy", "Rent", "Off-plan"] as const).map((item) => <button key={item} className={listingType === item ? "selected" : ""} onClick={() => setListingType(item)}>{item === "Off-plan" ? "Off-plan" : `For ${item.toLowerCase()}`}</button>)}</div><label className="listing-search"><Icon name="search" size={16}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by area or property"/></label></div>
          <div className="property-grid">{filtered.slice(0, 3).map((p) => <article className="property-card" key={p.id}><div className="property-image" style={{ backgroundImage: `url(https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=950&q=85)` }}><span className="property-tag">{p.tag || "APR NEXT SELECT"}</span><button className={saved.includes(p.id) ? "save-button saved" : "save-button"} aria-label="Save property" onClick={() => setSaved(saved.includes(p.id) ? saved.filter((id) => id !== p.id) : [...saved, p.id])}><Icon name="heart" size={18}/></button></div><div className="property-info"><div className="property-area"><Icon name="pin" size={13}/>{p.area}</div><h3>{p.name}</h3><div className="property-meta"><span>{p.beds}</span><i/><span>{p.size}</span></div><div className="property-price-row"><strong>{p.price}</strong><a href="#contact" aria-label="View property"><Icon name="arrow" size={17}/></a></div></div></article>)}</div>
          {filtered.length === 0 && <div className="empty-state">No homes match that search. Try another area or clear your search.</div>}
          <a href="#contact" className="text-link dark-link mobile-link">View all properties <Icon name="arrow" size={17}/></a>
        </div>
      </section>

      <section className="areas-section section-wrap" id="areas"><div className="section-heading"><div><span className="eyebrow"><span/> FIND YOUR NEIGHBORHOOD</span><h2>Dubai, in <em>your own way.</em></h2></div><p className="heading-note">Every community has its own rhythm.<br/>Find the one that feels like yours.</p></div><div className="area-grid">{areas.map((area, i) => <a href="#properties" className="area-card" key={area.name} style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(23,30,26,.67)), url(https://images.unsplash.com/${area.image}?auto=format&fit=crop&w=1000&q=85)` }}><span className="area-number">0{i + 1} — COMMUNITY</span><div><h3>{area.name}</h3><p>{area.note}</p></div><span className="area-arrow"><Icon name="arrow" size={18}/></span></a>)}</div></section>

      <section className="advisor-section" id="contact"><div className="advisor-image"/><div className="advisor-copy"><span className="eyebrow light"><span/> GOOD THINGS START WITH A CONVERSATION</span><h2>Your next chapter<br/>starts <em>somewhere.</em></h2><p>Tell us what you’re looking for. We’ll take it from there, thoughtfully and at your pace.</p><form className="advisor-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><input type="email" placeholder="Your email address" required aria-label="Your email address"/><button type="submit" aria-label="Submit email"><Icon name="arrow" size={19}/></button></form>{submitted && <span className="success-note">Thank you. An APR NEXT advisor will be in touch.</span>}<small>NO PRESSURE. JUST A GOOD PLACE TO BEGIN.</small></div></section>

      <section className="journal-section section-wrap" id="journal"><div className="section-heading"><div><span className="eyebrow"><span/> NOTES FROM DUBAI</span><h2>A little local <em>perspective.</em></h2></div><a className="text-link dark-link desktop-link" href="#contact">Visit the journal <Icon name="arrow" size={17}/></a></div><div className="journal-grid"><article className="journal-feature"><div className="journal-photo"/><div className="journal-details"><span>AREA NOTES&nbsp;&nbsp; · &nbsp;&nbsp;6 MIN READ</span><h3>The case for a slower<br/>kind of Dubai living</h3><a href="#contact" className="text-link dark-link">Read the story <Icon name="arrow" size={15}/></a></div></article><div className="journal-side"><article><span>BUYING WELL&nbsp;&nbsp; · &nbsp;&nbsp;4 MIN READ</span><h3>What to look for in a home that holds its value</h3><a href="#contact" className="text-link dark-link">Read the story <Icon name="arrow" size={15}/></a></article><article><span>THE NEIGHBORHOOD&nbsp;&nbsp; · &nbsp;&nbsp;5 MIN READ</span><h3>A morning, well spent in Alserkal Avenue</h3><a href="#contact" className="text-link dark-link">Read the story <Icon name="arrow" size={15}/></a></article></div></div></section>

      <footer className="footer"><div className="footer-main"><a className="brand footer-brand" href="#top" aria-label="APR NEXT home"><Image className="brand-logo" src="/images/are-next-logo.jpeg" alt="APR NEXT — Affordable Plus Realty" width={1536} height={1024} /></a><p>Good homes change everything.<br/>Let’s find yours.</p><div className="footer-contact"><span>COME SAY HELLO</span><a href="tel:+971558451513">+971 55 845 1513</a></div><div className="footer-contact"><span>FIND US</span><p>KML Building - Al Meydan Rd - Al Qouz First - Al Quoz - Dubai</p></div></div><div className="footer-bottom"><span>© 2025 APR NEXT · AFFORDABLE PLUS REALTY</span><div><a href="#contact">INSTAGRAM</a><a href="#contact">LINKEDIN</a></div><span>MADE WITH CARE IN DUBAI</span></div></footer>
    </main>
  );
}
