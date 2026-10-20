import { unsplash } from './images.js'

export const galleryCategories = ['All', 'Painting', 'Detailing', 'Repair']

const item = (id, category, photo, en, hi) => ({ id, category, image: unsplash(photo, 1600), alt: { en, hi } })

export const gallery = [
  item(1, 'Painting', '1727229428005-fcc8feaa2e41', 'Red Hyundai Kona with a showroom shine', 'शोरूम जैसी चमक वाली लाल ह्युंडई कोना'),
  item(2, 'Detailing', '1633711507230-f6554ef4d9fa', 'White Tata Harrier after detailing', 'डिटेलिंग के बाद सफ़ेद टाटा हैरियर'),
  item(3, 'Repair', '1767339736233-f4b02c41ee4a', 'Mechanic reconditioning engine parts', 'इंजन पार्ट्स को ठीक करता मैकेनिक'),
  item(4, 'Detailing', '1670122872487-8fea1dd1c08c', 'Kia Seltos with a ceramic coating gloss', 'सिरेमिक कोटिंग से चमकती किआ सेल्टॉस'),
  item(5, 'Painting', '1663852408695-f57f4d75a536', 'White Maruti Swift with a refinished body', 'नई फ़िनिश वाली सफ़ेद मारुति स्विफ़्ट'),
  item(6, 'Repair', '1619642751034-765dfdf7c58e', 'Close-up of engine repair work with a wrench', 'रिंच से इंजन रिपेयर का क्लोज़-अप'),
  item(7, 'Detailing', '1669971080123-4493adba7ba7', 'White Kia Seltos glowing after a full polish', 'फ़ुल पॉलिश के बाद चमकती सफ़ेद किआ सेल्टॉस'),
  item(8, 'Painting', '1653407978873-f7bd5d3a3f8f', 'Orange Hyundai Creta with fresh paint', 'नए पेंट वाली नारंगी ह्युंडई क्रेटा'),
  item(9, 'Repair', '1613214149922-f1809c99b414', 'Wheel being removed with an impact wrench', 'इम्पैक्ट रिंच से खोला जाता पहिया'),
  item(10, 'Detailing', '1610647752706-3bb12232b3ab', 'Spotless car interior after detailing', 'डिटेलिंग के बाद चमचमाता कार इंटीरियर'),
  item(11, 'Repair', '1487754180451-c456f719a1fc', 'Engine oil being topped up during a service', 'सर्विस के दौरान इंजन ऑयल टॉप-अप'),
  item(12, 'Painting', '1628573042918-a91e94c2c906', 'White Tata Harrier with a flawless finish', 'बेदाग़ फ़िनिश वाली सफ़ेद टाटा हैरियर'),
  item(13, 'Detailing', '1657179724285-d347db4c73a7', 'Kia Seltos after a full exterior detail', 'फ़ुल एक्सटीरियर डिटेलिंग के बाद किआ सेल्टॉस'),
  item(14, 'Repair', '1769218403508-90c67335aab5', 'Suspension and drive shaft repair', 'सस्पेंशन और ड्राइव शाफ़्ट रिपेयर'),
  item(15, 'Painting', '1663852397535-18292e115327', 'White Maruti Swift after paint correction', 'पेंट करेक्शन के बाद सफ़ेद मारुति स्विफ़्ट'),
  item(16, 'Repair', '1625047509248-ec889cbff17f', 'Technician working under the bonnet in the workshop', 'वर्कशॉप में बोनट के नीचे काम करता टेक्नीशियन'),
  item(17, 'Detailing', '1646029642262-022158ff5794', 'Red Hyundai Tucson after a deep clean', 'गहरी सफ़ाई के बाद लाल ह्युंडई टूसॉन'),
  item(18, 'Painting', '1659406189166-7c17fe5df12a', 'Two-tone Kia Seltos with a glossy finish', 'चमकदार फ़िनिश वाली टू-टोन किआ सेल्टॉस'),
]
