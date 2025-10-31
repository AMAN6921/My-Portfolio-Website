import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { heroData, skillCategories, projects, experiences, achievements } from '@/data';

// Force static generation for optimal performance
export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main id="main-content">
        <Hero
          name={heroData.name}
          title={heroData.title}
          location={heroData.location}
          education={heroData.education}
          currentRole={heroData.currentRole}
          summary={heroData.summary}
          contacts={heroData.contacts}
        />

        <Skills skillCategories={skillCategories} />

        <Projects projects={projects} />

        <Experience experiences={experiences} />

        <Achievements achievements={achievements} />

        <Contact
          email={heroData.contacts.email}
          github={heroData.contacts.github}
          linkedin={heroData.contacts.linkedin}
        />
      </main>

      <Footer
        name={heroData.name}
        contacts={heroData.contacts}
      />
    </>
  );
}
