import React from 'react'
import PageHeader from '../../components/header/PageHeader'
import { useTranslation } from "react-i18next";
import RichMediaGallery from '../../components/about/RichMediaGallery';
import AboutCard from '../../components/about/AboutCard';


export default function About() {
    const { t } = useTranslation();

    // exmple context
    const cards = [
    {
      title: t('about-us-page.1.title-2'),
      description:
       t('about-us-page.1.about-description-2'),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      buttonText: "Book Now",
      reverse: false,
    },
    {
      title: t('about-us-page.2.title-3'),
      description:
         t('about-us-page.2.about-description-3'),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      
      reverse: true, // This one flips layout
    },
    {
      title: t('about-us-page.3.title-4'),
      description:
        t('about-us-page.3.about-description-4'),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      
      reverse: false,
    },{
      title: t('about-us-page.4.title-5'),
      description:
       t('about-us-page.4.about-description-5'),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      buttonText: "Book Now",
      reverse: true,
    },
  ];


  return (
    <div>
      {/* page header */}

      <PageHeader title={t("about-us-page.0.title")} >
      <p>{t("about-us-page.0.about-description")}</p>
      </PageHeader>
      
      <RichMediaGallery/>
      {/* why choose us? */}
      <div>
      {cards.map((card, index) => (
        <AboutCard key={index} {...card} />
      ))}
    </div>

      {/* suitable for with four div with an image */}
    
    </div>
  )
}


// button to other pages