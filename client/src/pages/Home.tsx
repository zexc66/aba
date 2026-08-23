import { useLanguageContext } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Programs from "@/components/home/Programs";
import Countries from "@/components/home/Countries";
import Governance from "@/components/home/Governance";
import Team from "@/components/home/Team";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import Newsroom from "@/components/home/Newsroom";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const { lang, content: t, isFetchingCMS } = useLanguageContext();

  return (
    <>
      <SEO title={t.metaTitle} description={t.hero.subtitle} lang={lang} url="/" />
      {isFetchingCMS && <PageLoader minDuration={300} />}

      <div className="relative min-h-screen text-[#0b0b10] editorial-theme">
        <AnimatedBackground />
        <Header nav={t.nav} />

        <main>
          <Hero data={t.hero} stats={t.stats} />
          <About data={t.about} />
          <Programs data={t.programs} />
          <Countries data={t.countries} />
          <Governance data={t.governance} hud={t.hud} />
          <Team data={t.team} hud={t.hud} />
          <Partners data={t.partners} hud={t.hud} lang={lang} />
          <Testimonials data={t.testimonials} hud={t.hud} lang={lang} />
          <Newsroom data={t.newsroom} engagements={t.engagements} lang={lang} />
          <Contact data={t.contact} lang={lang} />
        </main>

        <Footer data={t.footer} newsroom={t.newsroom} lang={lang} />
        <ScrollToTop />
      </div>
    </>
  );
}
