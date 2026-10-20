import LegalPage from './LegalPage.jsx'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

// Placeholder text — have this reviewed before going live.
const sections = [
  {
    heading: { en: 'Bookings', hi: 'बुकिंग' },
    body: {
      en: 'Bookings made through this website or WhatsApp are requests and are confirmed only once our team contacts you. Slot availability may vary depending on workshop load.',
      hi: 'इस वेबसाइट या व्हाट्सऐप से की गई बुकिंग एक अनुरोध है, जो हमारी टीम के संपर्क करने के बाद ही कन्फ़र्म होती है। वर्कशॉप में काम के अनुसार स्लॉट की उपलब्धता बदल सकती है।',
    },
  },
  {
    heading: { en: 'Estimates & Pricing', hi: 'एस्टिमेट और कीमतें' },
    body: {
      en: 'All estimates are provided after inspection and may change if additional issues are found during service. No additional work will be carried out without your approval. Prices on this website, if any, are indicative.',
      hi: 'सभी एस्टिमेट जाँच के बाद दिए जाते हैं और सर्विस के दौरान अतिरिक्त समस्या मिलने पर बदल सकते हैं। आपकी मंज़ूरी के बिना कोई अतिरिक्त काम नहीं किया जाएगा। वेबसाइट पर दी गई कीमतें, यदि कोई हों, अनुमानित हैं।',
    },
  },
  {
    heading: { en: 'Parts & Warranty', hi: 'पार्ट्स और वारंटी' },
    body: {
      en: 'We use genuine or OEM-equivalent parts. Warranty on parts is as per the manufacturer’s terms; warranty on workmanship is as communicated on your invoice. Warranty does not cover misuse, accidents or wear and tear.',
      hi: 'हम असली या OEM-समकक्ष पार्ट्स इस्तेमाल करते हैं। पार्ट्स पर वारंटी कंपनी की शर्तों के अनुसार है; काम पर वारंटी आपके बिल में बताए अनुसार है। गलत उपयोग, एक्सीडेंट या सामान्य घिसावट वारंटी में शामिल नहीं है।',
    },
  },
  {
    heading: { en: 'Vehicle Pickup & Delivery', hi: 'गाड़ी का पिकअप और डिलीवरी' },
    body: {
      en: 'Free pickup and drop is available within Rewa city limits and is subject to availability. Please remove all valuables from your vehicle before handing it over. We are not responsible for items left inside the vehicle.',
      hi: 'रीवा शहर की सीमा में मुफ़्त पिकअप और ड्रॉप उपलब्धता के अनुसार है। गाड़ी सौंपने से पहले कृपया सभी कीमती सामान निकाल लें। गाड़ी में छोड़े गए सामान की ज़िम्मेदारी हमारी नहीं है।',
    },
  },
  {
    heading: { en: 'Payments', hi: 'भुगतान' },
    body: {
      en: 'Payment is due on delivery of the vehicle unless otherwise agreed. For insurance claims, any amount not covered by the insurer (depreciation, compulsory deductible, etc.) is payable by the customer.',
      hi: 'जब तक अलग से तय न हो, भुगतान गाड़ी की डिलीवरी पर करना होगा। इंश्योरेंस क्लेम में बीमा कंपनी द्वारा कवर न की गई राशि (डेप्रिसिएशन, अनिवार्य कटौती आदि) ग्राहक को देनी होगी।',
    },
  },
  {
    heading: { en: 'Uncollected Vehicles', hi: 'न ले जाई गई गाड़ियाँ' },
    body: {
      en: 'Vehicles not collected within 7 days of completion intimation may attract parking charges.',
      hi: 'काम पूरा होने की सूचना के 7 दिन के भीतर न ले जाई गई गाड़ियों पर पार्किंग शुल्क लग सकता है।',
    },
  },
  {
    heading: { en: 'Contact', hi: 'संपर्क' },
    body: {
      en: `For any questions regarding these terms, contact ${siteConfig.name} at ${siteConfig.email} or ${siteConfig.phone}.`,
      hi: `इन शर्तों के बारे में किसी भी सवाल के लिए ${siteConfig.name} से ${siteConfig.email} या ${siteConfig.phone} पर संपर्क करें।`,
    },
  },
]

export default function Terms() {
  const { t } = useLang()
  return (
    <LegalPage
      title={{ en: 'Terms & Conditions', hi: 'नियम और शर्तें' }}
      description={t('legal.termsDesc', { name: siteConfig.name })}
      updated={{ en: '1 January 2026', hi: '1 जनवरी 2026' }}
      sections={sections}
    />
  )
}
