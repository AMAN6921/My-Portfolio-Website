import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import { heroData, skillCategories, projects, experiences, achievements, certifications } from '@/data';

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

        <Certifications certifications={certifications} />

        <Contact
          email={heroData.contacts.email}
          github={heroData.contacts.github}
          linkedin={heroData.contacts.linkedin}
        />
      </main>
    </>
  );
}
