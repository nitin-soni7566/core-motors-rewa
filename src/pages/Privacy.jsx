import LegalPage from './LegalPage.jsx'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

// Placeholder text — have this reviewed before going live.
const sections = [
  {
    heading: { en: 'Information We Collect', hi: 'हम कौन-सी जानकारी लेते हैं' },
    body: {
      en: `When you book a service or contact ${siteConfig.name}, we collect the details you provide such as your name, phone number, car brand, model, year and service requirements. This website does not store your information on any server — booking details are sent directly to us through WhatsApp.`,
      hi: `जब आप सर्विस बुक करते हैं या ${siteConfig.name} से संपर्क करते हैं, तो हम आपके द्वारा दी गई जानकारी जैसे नाम, फ़ोन नंबर, कार ब्रांड, मॉडल, साल और सर्विस की ज़रूरत लेते हैं। यह वेबसाइट आपकी जानकारी किसी सर्वर पर सेव नहीं करती — बुकिंग की जानकारी सीधे व्हाट्सऐप के ज़रिए हमें भेजी जाती है।`,
    },
  },
  {
    heading: { en: 'How We Use Your Information', hi: 'हम आपकी जानकारी का उपयोग कैसे करते हैं' },
    body: {
      en: 'We use your information only to respond to your enquiry, schedule and carry out services, share estimates and updates, and provide after-service support. We do not sell or rent your personal information to anyone.',
      hi: 'हम आपकी जानकारी केवल आपके सवाल का जवाब देने, सर्विस शेड्यूल करने और करने, एस्टिमेट व अपडेट भेजने और सर्विस के बाद सहायता देने के लिए उपयोग करते हैं। हम आपकी निजी जानकारी किसी को बेचते या किराए पर नहीं देते।',
    },
  },
  {
    heading: { en: 'Third-Party Services', hi: 'थर्ड-पार्टी सेवाएँ' },
    body: {
      en: 'Our website uses third-party services including WhatsApp (for bookings), Google Maps (for our location) and image hosting. These services may collect information according to their own privacy policies.',
      hi: 'हमारी वेबसाइट व्हाट्सऐप (बुकिंग के लिए), गूगल मैप्स (लोकेशन के लिए) और इमेज होस्टिंग जैसी थर्ड-पार्टी सेवाओं का उपयोग करती है। ये सेवाएँ अपनी गोपनीयता नीतियों के अनुसार जानकारी ले सकती हैं।',
    },
  },
  {
    heading: { en: 'Cookies & Preferences', hi: 'कुकीज़ और पसंद' },
    body: {
      en: 'This website does not use tracking cookies of its own. Your theme (light/dark) and language choice are saved only in your own browser. Embedded third-party content such as Google Maps may set cookies.',
      hi: 'यह वेबसाइट अपनी ओर से ट्रैकिंग कुकीज़ का उपयोग नहीं करती। आपकी थीम (लाइट/डार्क) और भाषा की पसंद केवल आपके अपने ब्राउज़र में सेव होती है। गूगल मैप्स जैसी थर्ड-पार्टी सामग्री कुकीज़ सेट कर सकती है।',
    },
  },
  {
    heading: { en: 'Data Security', hi: 'डेटा सुरक्षा' },
    body: {
      en: 'We take reasonable steps to protect the information you share with us. However, no method of transmission over the internet is completely secure.',
      hi: 'आपके द्वारा साझा की गई जानकारी की सुरक्षा के लिए हम उचित कदम उठाते हैं। हालाँकि, इंटरनेट पर कोई भी तरीका पूरी तरह सुरक्षित नहीं होता।',
    },
  },
  {
    heading: { en: 'Contact Us', hi: 'संपर्क करें' },
    body: {
      en: `If you have any questions about this Privacy Policy, please contact us at ${siteConfig.email} or call ${siteConfig.phone}.`,
      hi: `इस गोपनीयता नीति के बारे में किसी भी सवाल के लिए हमें ${siteConfig.email} पर ईमेल करें या ${siteConfig.phone} पर कॉल करें।`,
    },
  },
]

export default function Privacy() {
  const { t } = useLang()
  return (
    <LegalPage
      title={{ en: 'Privacy Policy', hi: 'गोपनीयता नीति' }}
      description={t('legal.privacyDesc', { name: siteConfig.name })}
      updated={{ en: '1 January 2026', hi: '1 जनवरी 2026' }}
      sections={sections}
    />
  )
}
