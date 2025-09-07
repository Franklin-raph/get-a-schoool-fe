'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const TawkTo = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Tawk.to variables
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      // Create and configure the script element
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/68aa18b2d8c4f1192819dd79/default';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      // Insert the script into the document
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkTo;