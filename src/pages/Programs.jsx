import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProgramCard from '../components/ProgramCard'
import Timeline from '../components/Timeline'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import styles from './Programs.module.css'

const Programs = () => {
  const { language } = useLanguage()
  const t = translations[language].programs

  useEffect(() => {
    document.title = `${t.pageTitle} | Sankalp Sewa Sansthan Kishangarh`
  }, [t.pageTitle])

  const events = [
   {
    id: 'ladli-ghar-monthly',
    date: "Since 2022 (Monthly)",
    title: "Ladli Ghar Ajmer – Monthly Support",
    description:
      "Since 2022, Sankalp Sewa Sansthan Kishangarh has been providing monthly essential support to the girls of Ladli Ghar, Ajmer. This includes stationery, edible items, and daily necessities to ensure their well-being, education, and dignity."
  },
  {
    id: 'gau-sewa-thursday',
    date: "Every Thursday",
    title: "Gau Sewa - Gur & Chara Distribution",
    description:
      "As part of our weekly Gau Sewa initiative, we provide gur and nutritious chara to cows every Thursday. This ongoing service reflects our commitment to compassion, tradition, and animal welfare."
  },
    {
      id: 'mega-health-camp',
      date: 'January 2025',
      title: 'Mega Health Camp',
      description: 'A comprehensive health camp providing free check-ups and medicines to over 500 villagers in rural Rajasthan.'
    },
    {
      id: 'winter-cloth-distribution',
      date: 'December 2024',
      title: 'Winter Cloth Distribution',
      description: 'Distributed warm clothes and blankets to homeless individuals and families in Jaipur and surrounding areas.'
    },
    {
      id: 'skill-development-workshop',
      date: 'November 2024',
      title: 'Skill Development Workshop',
      description: 'Launched a new vocational training center for women, offering courses in stitching and handicrafts.'
    },
    {
      id: 'diwali-food-drive',
      date: 'October 2024',
      title: 'Diwali Food Drive',
      description: 'Provided festive meals and ration kits to 1000+ underprivileged families during the Diwali festival.'
    },
    {
      id: 'tree-plantation-drive',
      date: 'September 2024',
      title: 'Tree Plantation Drive',
      description: 'Planted 5000 saplings across 10 villages to promote environmental conservation and green cover.'
    },
    {
      id: 'school-sweater-food-distribution',
      date: '2024',
      title: 'School Sweater and Food Distribution',
      description: 'Distributed warm sweaters and nutritious food to school children, ensuring their comfort and well-being during the winter season. This initiative supports children\'s education by providing essential items that help them stay warm and healthy while attending school.'
    }
  ]

  const programs = [
    {
      title: t.programTitles.childEducation,
      description: t.programDescriptions.childEducation,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      title: t.programTitles.healthcare,
      description: t.programDescriptions.healthcare,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      title: t.programTitles.skillDevelopment,
      description: t.programDescriptions.skillDevelopment,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: t.programTitles.environment,
      description: t.programDescriptions.environment,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      )
    },
    {
      title: t.programTitles.womenEmpowerment,
      description: t.programDescriptions.womenEmpowerment,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: t.programTitles.seniorCitizen,
      description: t.programDescriptions.seniorCitizen,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: t.programTitles.medicalCamps,
      description: t.programDescriptions.medicalCamps,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    }
  ]

  return (
    <div className={styles.programs}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
          <p className={styles.introText}>
            {t.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.programsGrid}>
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                description={program.description}
                icon={program.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <h2 className={styles.sectionHeading} style={{ textAlign: 'center', marginBottom: '3rem' }}>{t.recentActivities}</h2>
          <Timeline events={events} />
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>{t.wantToSupport}</h2>
            <p className={styles.ctaText}>
              {t.supportDesc}
            </p>
            <Link to="/get-involved" className="btn btn-primary">
              {translations[language].common.getInvolved}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs




