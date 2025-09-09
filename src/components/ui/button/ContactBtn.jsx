import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactBtn() {
    const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoToContact = () =>{
    navigate('/contact');
  }


  return (
    <>
    <button onClick={handleGoToContact}>
      {t("nav.contact")}
    </button>
    </>
  )
}
