import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
export default function ToggleLanBtn() {
  const { t , i18n } = useTranslation();
  const [isMalay , setIsMalay] = useState(i18n.language === 'ms');

  useEffect(() => {
    // update toggle state when language changes externally
    setIsMalay(i18n.language ==='ms');
  }, [i18n.language]);

  const handleToggleLan = () => {
    const newLang = isMalay ? 'en' :'ms' ;
    i18n.changeLanguage(newLang);
    setIsMalay(!isMalay);
  }

  return (
   <>
    <div className="language-toggle">
       
        
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isMalay}
            onChange={ handleToggleLan}
          />
          <span className="slider"></span>
        </label>
        
        
        <style>
          {` .language-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 30px 0;
        }
        
        .language-label {
            font-weight: 500;
            font-size: 16px;
            color: #2c3e50;
            transition: color 0.3s ease;
        }
        
        .language-label.active {
            color: #3498db;
            font-weight: 600;
        }
        
        /* The switch - the box around the slider */
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 30px;
        }
        
        /* Hide default HTML checkbox */
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        /* The slider */
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #3498db;
            transition: .4s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #2ecc71;
        }
        
        input:checked + .slider:before {
            transform: translateX(30px);
        }
        
        .slider:after {
            content: "EN";
            color: white;
            display: block;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 65%;
            font-size: 10px;
            font-weight: bold;
        }
        
        input:checked + .slider:after {
            content: "MY";
            left: 35%;
        }`}
        </style>
      </div>

   </>
  )
}
