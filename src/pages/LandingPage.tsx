import Hero from '../sections/Hero';
import Journey from '../sections/Journey';
import Skills from '../sections/Skills';
import Services from '../sections/Services';
import BlogSection from '../sections/BlogSection';
import Reviews from '../sections/Reviews';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Journey />
      <Skills />
      <Services />
      <BlogSection />
      <Reviews />
      <FAQ />
      <Contact />
    </div>
  );
}