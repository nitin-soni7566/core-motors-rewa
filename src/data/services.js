import { unsplash } from './images.js'

// Each text field is { en, hi }. icon: name of an icon in src/components/ServiceIcon.jsx
export const services = [
  {
    id: 1,
    slug: 'general-periodic-service',
    icon: 'wrench',
    title: { en: 'General Periodic Service', hi: 'जनरल पीरियॉडिक सर्विस' },
    short: {
      en: 'Oil change, filters, fluid top-ups and a 50-point health check as per your car’s schedule.',
      hi: 'ऑयल चेंज, फ़िल्टर, फ़्लूइड टॉप-अप और कंपनी शेड्यूल के अनुसार 50-पॉइंट हेल्थ चेक।',
    },
    description: {
      en: 'Regular servicing is the single best thing you can do for your car. Our periodic service follows your manufacturer’s schedule and includes engine oil and filter replacement, air and cabin filter cleaning or replacement, coolant, brake and washer fluid top-ups, and a detailed 50-point inspection. You get a clear report of what we found and what we recommend — no surprise add-ons.',
      hi: 'नियमित सर्विस आपकी कार के लिए सबसे ज़रूरी चीज़ है। हमारी पीरियॉडिक सर्विस कंपनी के शेड्यूल के अनुसार होती है — इंजन ऑयल और फ़िल्टर बदलना, एयर और केबिन फ़िल्टर की सफ़ाई या बदलाव, कूलेंट, ब्रेक और वॉशर फ़्लूइड टॉप-अप, और 50-पॉइंट की विस्तृत जाँच। आपको साफ़ रिपोर्ट मिलती है कि हमें क्या मिला और हम क्या सुझाते हैं — कोई अचानक अतिरिक्त काम नहीं।',
    },
    benefits: {
      en: ['Engine oil & oil filter replacement', 'Air, cabin & fuel filter check', 'All fluid levels topped up', '50-point inspection with report', 'Free car wash with every service'],
      hi: ['इंजन ऑयल और ऑयल फ़िल्टर बदलना', 'एयर, केबिन और फ़्यूल फ़िल्टर जाँच', 'सभी फ़्लूइड लेवल टॉप-अप', 'रिपोर्ट के साथ 50-पॉइंट जाँच', 'हर सर्विस के साथ मुफ़्त कार वॉश'],
    },
    image: unsplash('1487754180451-c456f719a1fc'),
    alt: { en: 'Mechanic pouring fresh engine oil into a car during periodic service', hi: 'पीरियॉडिक सर्विस के दौरान कार में नया इंजन ऑयल डालता मैकेनिक' },
  },
  {
    id: 2,
    slug: 'engine-repair',
    icon: 'cog',
    title: { en: 'Engine Repair', hi: 'इंजन रिपेयर' },
    short: {
      en: 'Diagnosis and repair of misfires, overheating, oil leaks, noises and complete engine overhauls.',
      hi: 'मिसफ़ायर, ओवरहीटिंग, ऑयल लीक, आवाज़ की जाँच-मरम्मत और पूरा इंजन ओवरहॉल।',
    },
    description: {
      en: 'From a check-engine light to a full overhaul, our technicians diagnose engine problems with computerised scanners and years of hands-on experience. We handle timing belts, gaskets, mounts, turbochargers, fuel injection, clutch work and complete engine rebuilds for petrol, diesel and CNG cars.',
      hi: 'चेक-इंजन लाइट से लेकर पूरे ओवरहॉल तक, हमारे टेक्नीशियन कंप्यूटराइज़्ड स्कैनर और वर्षों के अनुभव से इंजन की समस्या पहचानते हैं। टाइमिंग बेल्ट, गैस्केट, माउंट, टर्बोचार्जर, फ़्यूल इंजेक्शन, क्लच और पूरा इंजन रीबिल्ड — पेट्रोल, डीज़ल और CNG सभी कारों के लिए।',
    },
    benefits: {
      en: ['Computerised OBD diagnosis', 'Timing belt, gasket & mount replacement', 'Clutch and gearbox repair', 'Petrol, diesel & CNG engines', 'Warranty on repair work'],
      hi: ['कंप्यूटराइज़्ड OBD जाँच', 'टाइमिंग बेल्ट, गैस्केट और माउंट बदलना', 'क्लच और गियरबॉक्स रिपेयर', 'पेट्रोल, डीज़ल और CNG इंजन', 'रिपेयर पर वारंटी'],
    },
    image: unsplash('1619642751034-765dfdf7c58e'),
    alt: { en: 'Technician repairing a car engine with a wrench', hi: 'रिंच से कार का इंजन ठीक करता टेक्नीशियन' },
  },
  {
    id: 3,
    slug: 'denting-painting',
    icon: 'hammer',
    title: { en: 'Denting & Painting', hi: 'डेंटिंग और पेंटिंग' },
    short: {
      en: 'Dents, scratches and panel damage fixed with factory-matched paint and a dust-free finish.',
      hi: 'डेंट, स्क्रैच और पैनल डैमेज की मरम्मत — फ़ैक्ट्री जैसे मिलते पेंट और धूल-रहित फ़िनिश के साथ।',
    },
    description: {
      en: 'Minor dents and scratches make a car look older than it is. Our body shop pulls out dents, repairs panels and refinishes them with computer-matched paint so the repair blends perfectly with the rest of the car. Single panels are usually ready within 1–2 days.',
      hi: 'छोटे डेंट और स्क्रैच कार को पुराना दिखाते हैं। हमारी बॉडी शॉप डेंट निकालती है, पैनल ठीक करती है और कंप्यूटर से मिलाए गए पेंट से फ़िनिश करती है, ताकि मरम्मत बाकी कार से बिल्कुल मेल खाए। एक पैनल आमतौर पर 1–2 दिन में तैयार हो जाता है।',
    },
    benefits: {
      en: ['Computerised paint colour matching', 'Paintless dent removal where possible', 'Panel-by-panel pricing', 'Dust-free painting booth', 'Paint warranty'],
      hi: ['कंप्यूटराइज़्ड पेंट कलर मैचिंग', 'जहाँ संभव हो बिना पेंट डेंट हटाना', 'हर पैनल की अलग कीमत', 'धूल-रहित पेंटिंग बूथ', 'पेंट वारंटी'],
    },
    image: unsplash('1663852408695-f57f4d75a536'),
    alt: { en: 'White Maruti Suzuki Swift with a flawless glossy finish', hi: 'चमकदार बेदाग़ फ़िनिश वाली सफ़ेद मारुति सुज़ुकी स्विफ़्ट' },
  },
  {
    id: 4,
    slug: 'full-body-painting',
    icon: 'paint-roller',
    title: { en: 'Full Body Painting', hi: 'फ़ुल बॉडी पेंटिंग' },
    short: {
      en: 'Complete repaint in the original or a brand-new colour with premium automotive paints.',
      hi: 'प्रीमियम ऑटोमोटिव पेंट से ओरिजिनल या बिल्कुल नए रंग में पूरी कार का पेंट।',
    },
    description: {
      en: 'Give your car a showroom finish again. Full body painting includes stripping or sanding the old paint, dent and rust repair, primer, base coat and clear coat in a controlled booth, followed by machine polishing. Choose your original colour or a completely new shade.',
      hi: 'अपनी कार को फिर से शोरूम जैसी चमक दें। फ़ुल बॉडी पेंटिंग में पुराना पेंट हटाना, डेंट और जंग की मरम्मत, प्राइमर, बेस कोट और क्लियर कोट — नियंत्रित बूथ में — और फिर मशीन पॉलिश शामिल है। ओरिजिनल रंग चुनें या बिल्कुल नया।',
    },
    benefits: {
      en: ['Rust & dent treatment before paint', 'Premium 2K paints and clear coat', 'Original or custom colours', 'Machine polish finish', 'Before & after photos'],
      hi: ['पेंट से पहले जंग और डेंट का इलाज', 'प्रीमियम 2K पेंट और क्लियर कोट', 'ओरिजिनल या पसंदीदा रंग', 'मशीन पॉलिश फ़िनिश', 'पहले और बाद की फ़ोटो'],
    },
    image: unsplash('1653407978873-f7bd5d3a3f8f'),
    alt: { en: 'Orange Hyundai Creta with a fresh glossy paint finish', hi: 'ताज़ा चमकदार पेंट वाली नारंगी ह्युंडई क्रेटा' },
  },
  {
    id: 5,
    slug: 'accidental-insurance-repair',
    icon: 'shield-check',
    title: { en: 'Accidental & Insurance Repair', hi: 'एक्सीडेंटल और इंश्योरेंस रिपेयर' },
    short: {
      en: 'Cashless insurance claims and complete accident repair, handled end-to-end by our team.',
      hi: 'कैशलेस इंश्योरेंस क्लेम और पूरी एक्सीडेंट रिपेयर — शुरू से अंत तक हमारी टीम संभालती है।',
    },
    description: {
      en: 'Accidents are stressful — the paperwork shouldn’t be. We work with all major insurance companies for cashless claims, coordinate the surveyor visit, handle documentation and repair your car to pre-accident condition. We keep you updated with photos at every stage.',
      hi: 'एक्सीडेंट तनाव भरा होता है — कागज़ी काम नहीं होना चाहिए। हम सभी प्रमुख बीमा कंपनियों के साथ कैशलेस क्लेम करते हैं, सर्वेयर विज़िट और दस्तावेज़ संभालते हैं और आपकी कार को एक्सीडेंट से पहले जैसी हालत में लाते हैं। हर चरण पर फ़ोटो के साथ अपडेट देते हैं।',
    },
    benefits: {
      en: ['Cashless claims with major insurers', 'Surveyor coordination & paperwork', 'Structural and panel repair', 'Genuine replacement parts', 'Photo updates during repair'],
      hi: ['प्रमुख बीमा कंपनियों के साथ कैशलेस क्लेम', 'सर्वेयर और कागज़ी काम हमारी ज़िम्मेदारी', 'स्ट्रक्चरल और पैनल रिपेयर', 'असली रिप्लेसमेंट पार्ट्स', 'रिपेयर के दौरान फ़ोटो अपडेट'],
    },
    image: unsplash('1727893359929-9980a2171105'),
    alt: { en: 'Technicians repairing the rear panel of a car in the workshop', hi: 'वर्कशॉप में कार के पिछले पैनल की मरम्मत करते टेक्नीशियन' },
  },
  {
    id: 6,
    slug: 'car-ac-repair',
    icon: 'snowflake',
    title: { en: 'Car AC Repair', hi: 'कार AC रिपेयर' },
    short: {
      en: 'AC gas refill, cooling coil cleaning, compressor and leak repairs for chilled summers.',
      hi: 'AC गैस रीफ़िल, कूलिंग कॉइल की सफ़ाई, कंप्रेसर और लीक रिपेयर — गर्मी में ठंडी कार।',
    },
    description: {
      en: 'Rewa summers demand an AC that works. We check the complete AC system — gas pressure, compressor, condenser, cooling coil, blower and electrical controls — find leaks with dye testing, and fix the root cause instead of just topping up gas.',
      hi: 'रीवा की गर्मी में AC का ठीक चलना ज़रूरी है। हम पूरा AC सिस्टम जाँचते हैं — गैस प्रेशर, कंप्रेसर, कंडेंसर, कूलिंग कॉइल, ब्लोअर और इलेक्ट्रिकल कंट्रोल — डाई टेस्ट से लीक ढूँढते हैं और सिर्फ़ गैस भरने के बजाय असली कारण ठीक करते हैं।',
    },
    benefits: {
      en: ['AC gas top-up & full recharge', 'Leak detection and repair', 'Cooling coil & condenser cleaning', 'Compressor repair or replacement', 'Cabin filter replacement'],
      hi: ['AC गैस टॉप-अप और पूरा रीचार्ज', 'लीक की पहचान और रिपेयर', 'कूलिंग कॉइल और कंडेंसर की सफ़ाई', 'कंप्रेसर रिपेयर या बदलाव', 'केबिन फ़िल्टर बदलना'],
    },
    image: unsplash('1625047509248-ec889cbff17f'),
    alt: { en: 'Technician checking the AC system under the bonnet of a car', hi: 'कार के बोनट के नीचे AC सिस्टम जाँचता टेक्नीशियन' },
  },
  {
    id: 7,
    slug: 'wheel-alignment-balancing',
    icon: 'circle-dot',
    title: { en: 'Wheel Alignment & Balancing', hi: 'व्हील अलाइनमेंट और बैलेंसिंग' },
    short: {
      en: 'Computerised alignment and balancing for straight driving, even tyre wear and comfort.',
      hi: 'सीधी ड्राइविंग, टायरों की बराबर घिसाई और आराम के लिए कंप्यूटराइज़्ड अलाइनमेंट और बैलेंसिंग।',
    },
    description: {
      en: 'If your car pulls to one side, the steering vibrates or the tyres wear unevenly, you need alignment and balancing. We use computerised equipment to set the exact angles your manufacturer specifies and balance each wheel for a smooth ride.',
      hi: 'अगर कार एक तरफ़ खिंचती है, स्टीयरिंग काँपता है या टायर असमान घिसते हैं, तो अलाइनमेंट और बैलेंसिंग ज़रूरी है। हम कंप्यूटराइज़्ड मशीनों से कंपनी द्वारा तय सटीक एंगल सेट करते हैं और हर पहिए को बैलेंस करते हैं।',
    },
    benefits: {
      en: ['Computerised 3D alignment', 'Dynamic wheel balancing', 'Tyre rotation', 'Steering & suspension check', 'Longer tyre life'],
      hi: ['कंप्यूटराइज़्ड 3D अलाइनमेंट', 'डायनेमिक व्हील बैलेंसिंग', 'टायर रोटेशन', 'स्टीयरिंग और सस्पेंशन जाँच', 'टायरों की लंबी उम्र'],
    },
    image: unsplash('1613214149922-f1809c99b414'),
    alt: { en: 'Mechanic using an impact wrench on a car alloy wheel', hi: 'कार के अलॉय व्हील पर इम्पैक्ट रिंच चलाता मैकेनिक' },
  },
  {
    id: 8,
    slug: 'battery-electrical',
    icon: 'battery',
    title: { en: 'Battery & Electrical', hi: 'बैटरी और इलेक्ट्रिकल' },
    short: {
      en: 'Battery testing and replacement, wiring, lights, starter, alternator and sensor repairs.',
      hi: 'बैटरी टेस्ट और बदलाव, वायरिंग, लाइट, स्टार्टर, अल्टरनेटर और सेंसर रिपेयर।',
    },
    description: {
      en: 'Modern cars depend on electronics. We test batteries, alternators and starters, trace wiring faults, repair power windows and central locking, fix lights and horns, and diagnose sensor and ECU warnings using professional scan tools.',
      hi: 'आधुनिक कारें इलेक्ट्रॉनिक्स पर चलती हैं। हम बैटरी, अल्टरनेटर और स्टार्टर टेस्ट करते हैं, वायरिंग की खराबी ढूँढते हैं, पावर विंडो और सेंट्रल लॉकिंग, लाइट और हॉर्न ठीक करते हैं, और प्रोफ़ेशनल स्कैन टूल से सेंसर और ECU की चेतावनियाँ जाँचते हैं।',
    },
    benefits: {
      en: ['Free battery health test', 'Branded batteries with warranty', 'Wiring & fuse fault tracing', 'Starter and alternator repair', 'Power window & central locking'],
      hi: ['मुफ़्त बैटरी हेल्थ टेस्ट', 'वारंटी के साथ ब्रांडेड बैटरी', 'वायरिंग और फ़्यूज़ की खराबी की पहचान', 'स्टार्टर और अल्टरनेटर रिपेयर', 'पावर विंडो और सेंट्रल लॉकिंग'],
    },
    image: unsplash('1599256872237-5dcc0fbe9668'),
    alt: { en: 'Hands repairing car electrical wiring', hi: 'कार की इलेक्ट्रिकल वायरिंग ठीक करते हाथ' },
  },
  {
    id: 9,
    slug: 'brake-suspension',
    icon: 'disc',
    title: { en: 'Brake & Suspension', hi: 'ब्रेक और सस्पेंशन' },
    short: {
      en: 'Brake pads, discs, shock absorbers and suspension repairs for safe, comfortable driving.',
      hi: 'सुरक्षित और आरामदायक ड्राइविंग के लिए ब्रेक पैड, डिस्क, शॉक एब्ज़ॉर्बर और सस्पेंशन रिपेयर।',
    },
    description: {
      en: 'Your brakes and suspension keep you safe on every road. We inspect and replace brake pads, shoes, discs and drums, bleed brake fluid, and repair shock absorbers, struts, bushes, ball joints and steering components.',
      hi: 'ब्रेक और सस्पेंशन हर सड़क पर आपको सुरक्षित रखते हैं। हम ब्रेक पैड, शू, डिस्क और ड्रम जाँचते और बदलते हैं, ब्रेक फ़्लूइड बदलते हैं, और शॉक एब्ज़ॉर्बर, स्ट्रट, बुश, बॉल जॉइंट और स्टीयरिंग पार्ट्स की मरम्मत करते हैं।',
    },
    benefits: {
      en: ['Brake pad & disc replacement', 'Brake fluid replacement', 'Shock absorber & strut repair', 'Bush, link & ball joint replacement', 'Test drive after every job'],
      hi: ['ब्रेक पैड और डिस्क बदलना', 'ब्रेक फ़्लूइड बदलना', 'शॉक एब्ज़ॉर्बर और स्ट्रट रिपेयर', 'बुश, लिंक और बॉल जॉइंट बदलना', 'हर काम के बाद टेस्ट ड्राइव'],
    },
    image: unsplash('1769218403508-90c67335aab5'),
    alt: { en: 'Close-up of a car’s suspension and drive shaft', hi: 'कार के सस्पेंशन और ड्राइव शाफ़्ट का क्लोज़-अप' },
  },
  {
    id: 10,
    slug: 'detailing-interior-cleaning',
    icon: 'sparkles',
    title: { en: 'Detailing & Interior Cleaning', hi: 'डिटेलिंग और इंटीरियर क्लीनिंग' },
    short: {
      en: 'Deep interior cleaning, upholstery shampoo, polishing and odour removal inside and out.',
      hi: 'इंटीरियर की गहरी सफ़ाई, सीट शैम्पू, पॉलिशिंग और बदबू हटाना — अंदर और बाहर।',
    },
    description: {
      en: 'Our detailing brings back that new-car feel. Interiors are vacuumed, shampooed and steam-cleaned — seats, roof, carpets and dashboard — while the exterior gets a multi-stage wash, clay bar treatment, machine polish and wax.',
      hi: 'हमारी डिटेलिंग कार में फिर से नई कार जैसा एहसास लाती है। इंटीरियर — सीटें, छत, कार्पेट और डैशबोर्ड — वैक्यूम, शैम्पू और स्टीम से साफ़ होता है, और बाहर मल्टी-स्टेज वॉश, क्ले बार ट्रीटमेंट, मशीन पॉलिश और वैक्स।',
    },
    benefits: {
      en: ['Seat & carpet shampoo', 'Dashboard and trim restoration', 'Odour & germ removal', 'Clay bar and machine polish', 'Engine bay cleaning'],
      hi: ['सीट और कार्पेट शैम्पू', 'डैशबोर्ड और ट्रिम की चमक', 'बदबू और कीटाणु हटाना', 'क्ले बार और मशीन पॉलिश', 'इंजन बे की सफ़ाई'],
    },
    image: unsplash('1610647752706-3bb12232b3ab'),
    alt: { en: 'Clean, detailed car interior with dashboard and steering wheel', hi: 'डैशबोर्ड और स्टीयरिंग के साथ साफ़-सुथरा कार इंटीरियर' },
  },
  {
    id: 11,
    slug: 'ceramic-coating',
    icon: 'gem',
    title: { en: 'Ceramic Coating', hi: 'सिरेमिक कोटिंग' },
    short: {
      en: 'Long-lasting glossy protection against UV, water spots, dust and minor scratches.',
      hi: 'UV, पानी के धब्बों, धूल और हल्के स्क्रैच से लंबे समय तक चमकदार सुरक्षा।',
    },
    description: {
      en: 'Ceramic coating bonds to your car’s paint to create a hard, hydrophobic layer that keeps it glossy for years. Water beads off, dirt washes away easily and the paint is protected from UV fading and bird droppings. Includes paint correction before coating.',
      hi: 'सिरेमिक कोटिंग कार के पेंट से जुड़कर एक मज़बूत, पानी-रोधी परत बनाती है जो सालों तक चमक बनाए रखती है। पानी फिसल जाता है, गंदगी आसानी से धुल जाती है और पेंट धूप से फीका पड़ने और पक्षियों की बीट से बचा रहता है। कोटिंग से पहले पेंट करेक्शन शामिल।',
    },
    benefits: {
      en: ['Paint correction before coating', '9H hardness, multi-year protection', 'Hydrophobic water-beading finish', 'UV and chemical resistance', 'Warranty card provided'],
      hi: ['कोटिंग से पहले पेंट करेक्शन', '9H हार्डनेस, कई साल की सुरक्षा', 'पानी-रोधी फ़िनिश', 'UV और केमिकल से बचाव', 'वारंटी कार्ड'],
    },
    image: unsplash('1670122872487-8fea1dd1c08c'),
    alt: { en: 'White Kia Seltos with a high-gloss ceramic coated finish', hi: 'चमकदार सिरेमिक कोटिंग वाली सफ़ेद किआ सेल्टॉस' },
  },
  {
    id: 12,
    slug: 'paint-protection-film',
    icon: 'shield',
    title: { en: 'Paint Protection Film (PPF)', hi: 'पेंट प्रोटेक्शन फ़िल्म (PPF)' },
    short: {
      en: 'Invisible, self-healing film that protects paint from stone chips and scratches.',
      hi: 'अदृश्य, सेल्फ़-हीलिंग फ़िल्म जो पेंट को पत्थर के निशान और स्क्रैच से बचाती है।',
    },
    description: {
      en: 'PPF is a clear, tough urethane film that shields your paint from stone chips, scratches and road debris. Light swirl marks heal themselves with heat. Choose full-body coverage or high-impact areas like the bonnet, bumpers and mirrors.',
      hi: 'PPF एक पारदर्शी, मज़बूत यूरेथेन फ़िल्म है जो पेंट को पत्थरों, स्क्रैच और सड़क के कचरे से बचाती है। हल्के निशान गर्मी से अपने आप ठीक हो जाते हैं। पूरी बॉडी या बोनट, बंपर और मिरर जैसे हिस्सों के लिए चुनें।',
    },
    benefits: {
      en: ['Self-healing TPU film', 'Full body or partial coverage', 'Gloss or matte finish', 'Protects resale value', 'Manufacturer warranty'],
      hi: ['सेल्फ़-हीलिंग TPU फ़िल्म', 'पूरी बॉडी या आंशिक कवरेज', 'ग्लॉस या मैट फ़िनिश', 'रीसेल वैल्यू की सुरक्षा', 'कंपनी वारंटी'],
    },
    image: unsplash('1633711507230-f6554ef4d9fa'),
    alt: { en: 'White Tata Harrier with protected paint in a showroom', hi: 'शोरूम में सुरक्षित पेंट वाली सफ़ेद टाटा हैरियर' },
  },
  {
    id: 13,
    slug: 'sunfilm-vinyl-wrap',
    icon: 'sun',
    title: { en: 'Sunfilm & Vinyl Wrap', hi: 'सनफ़िल्म और विनाइल रैप' },
    short: {
      en: 'Legal sun-control films and colour-change vinyl wraps for style and comfort.',
      hi: 'स्टाइल और आराम के लिए नियमानुसार सन-कंट्रोल फ़िल्म और रंग बदलने वाले विनाइल रैप।',
    },
    description: {
      en: 'Keep the cabin cooler with heat-rejecting sun-control films that follow legal visibility norms, or change your car’s look completely with a premium vinyl wrap — gloss, matte, satin or carbon finishes — that also protects the original paint underneath.',
      hi: 'नियमानुसार दृश्यता वाली हीट-रिजेक्टिंग सन-कंट्रोल फ़िल्म से केबिन ठंडा रखें, या प्रीमियम विनाइल रैप — ग्लॉस, मैट, सैटिन या कार्बन फ़िनिश — से कार का लुक पूरी तरह बदलें, जो नीचे के ओरिजिनल पेंट को भी बचाता है।',
    },
    benefits: {
      en: ['Heat & UV rejecting films', 'Full or partial vinyl wraps', 'Gloss, matte, satin & carbon', 'Removable without paint damage', 'Roof and chrome-delete wraps'],
      hi: ['गर्मी और UV रोकने वाली फ़िल्म', 'पूरा या आंशिक विनाइल रैप', 'ग्लॉस, मैट, सैटिन और कार्बन', 'पेंट को नुकसान बिना हटाने योग्य', 'रूफ़ और क्रोम-डिलीट रैप'],
    },
    image: unsplash('1659406189166-7c17fe5df12a'),
    alt: { en: 'Two-tone Kia Seltos with a contrast black roof', hi: 'कॉन्ट्रास्ट काली छत वाली टू-टोन किआ सेल्टॉस' },
  },
  {
    id: 14,
    slug: 'accessories',
    icon: 'package',
    title: { en: 'Accessories', hi: 'एक्सेसरीज़' },
    short: {
      en: 'Seat covers, mats, music systems, cameras, lights and more — supplied and fitted.',
      hi: 'सीट कवर, मैट, म्यूज़िक सिस्टम, कैमरा, लाइट और बहुत कुछ — लगाकर भी देते हैं।',
    },
    description: {
      en: 'Upgrade your car with quality accessories, professionally fitted. We supply and install seat covers, 7D mats, Android music systems, reverse cameras, parking sensors, LED lights, dashcams, alloy wheels and more for every brand.',
      hi: 'अच्छी क्वालिटी की एक्सेसरीज़ से अपनी कार अपग्रेड करें, प्रोफ़ेशनल फ़िटिंग के साथ। सीट कवर, 7D मैट, एंड्रॉयड म्यूज़िक सिस्टम, रिवर्स कैमरा, पार्किंग सेंसर, LED लाइट, डैशकैम, अलॉय व्हील और बहुत कुछ — हर ब्रांड के लिए।',
    },
    benefits: {
      en: ['Seat covers & floor mats', 'Music systems & speakers', 'Reverse camera & sensors', 'LED headlights & fog lamps', 'Professional, clean installation'],
      hi: ['सीट कवर और फ़्लोर मैट', 'म्यूज़िक सिस्टम और स्पीकर', 'रिवर्स कैमरा और सेंसर', 'LED हेडलाइट और फ़ॉग लैंप', 'प्रोफ़ेशनल और साफ़ फ़िटिंग'],
    },
    image: unsplash('1449965408869-eaa3f722e40d'),
    alt: { en: 'Driver inside a car with an upgraded dashboard and infotainment', hi: 'अपग्रेड किए डैशबोर्ड और इन्फ़ोटेनमेंट वाली कार में ड्राइवर' },
  },
  {
    id: 15,
    slug: 'tyres',
    icon: 'life-buoy',
    title: { en: 'Tyres', hi: 'टायर' },
    short: {
      en: 'New tyres from leading brands, puncture repair, nitrogen filling and tyre rotation.',
      hi: 'प्रमुख ब्रांड्स के नए टायर, पंचर रिपेयर, नाइट्रोजन भरना और टायर रोटेशन।',
    },
    description: {
      en: 'We stock tyres from leading brands in all popular sizes, with fitting, balancing and alignment done in-house. We also handle puncture repair, tubeless conversion, nitrogen filling and honest advice on when your tyres really need replacing.',
      hi: 'हमारे पास सभी लोकप्रिय साइज़ में प्रमुख ब्रांड्स के टायर हैं, फ़िटिंग, बैलेंसिंग और अलाइनमेंट यहीं होता है। पंचर रिपेयर, ट्यूबलेस कन्वर्ज़न, नाइट्रोजन भरना, और ईमानदार सलाह कि टायर सच में कब बदलने हैं।',
    },
    benefits: {
      en: ['Leading tyre brands in stock', 'Fitting, balancing & alignment', 'Puncture & tubeless repair', 'Nitrogen filling', 'Old tyre exchange'],
      hi: ['प्रमुख ब्रांड्स के टायर उपलब्ध', 'फ़िटिंग, बैलेंसिंग और अलाइनमेंट', 'पंचर और ट्यूबलेस रिपेयर', 'नाइट्रोजन भरना', 'पुराने टायर का एक्सचेंज'],
    },
    image: unsplash('1578844251758-2f71da64c96f'),
    alt: { en: 'Stack of new car tyres in a tyre shop', hi: 'टायर शॉप में नए कार टायरों का ढेर' },
  },
  {
    id: 16,
    slug: 'car-wash',
    icon: 'droplets',
    title: { en: 'Car Wash', hi: 'कार वॉश' },
    short: {
      en: 'Foam wash, underbody wash, vacuuming and tyre dressing for a sparkling clean car.',
      hi: 'फ़ोम वॉश, अंडरबॉडी वॉश, वैक्यूम और टायर ड्रेसिंग — चमचमाती साफ़ कार।',
    },
    description: {
      en: 'Our car wash uses pH-neutral foam and pressure washers that are safe on paint. Choose from a quick exterior wash, foam wash with interior vacuum, or a premium wash with underbody cleaning, tyre dressing and dashboard polish.',
      hi: 'हमारे कार वॉश में pH-न्यूट्रल फ़ोम और प्रेशर वॉशर इस्तेमाल होते हैं जो पेंट के लिए सुरक्षित हैं। क्विक एक्सटीरियर वॉश, इंटीरियर वैक्यूम के साथ फ़ोम वॉश, या अंडरबॉडी सफ़ाई, टायर ड्रेसिंग और डैशबोर्ड पॉलिश वाला प्रीमियम वॉश चुनें।',
    },
    benefits: {
      en: ['Snow foam pressure wash', 'Underbody wash', 'Interior vacuuming', 'Tyre & dashboard dressing', 'Paint-safe products'],
      hi: ['स्नो फ़ोम प्रेशर वॉश', 'अंडरबॉडी वॉश', 'इंटीरियर वैक्यूम', 'टायर और डैशबोर्ड ड्रेसिंग', 'पेंट के लिए सुरक्षित प्रोडक्ट'],
    },
    image: unsplash('1652987086612-d948b775d358'),
    alt: { en: 'Detailer spraying and cleaning a car’s paint', hi: 'कार के पेंट पर स्प्रे करके सफ़ाई करता डिटेलर' },
  },
  {
    id: 17,
    slug: 'pickup-drop',
    icon: 'truck',
    title: { en: 'Pickup & Drop', hi: 'पिकअप और ड्रॉप' },
    short: {
      en: 'Free doorstep pickup and drop within Rewa city — service your car without leaving home.',
      hi: 'रीवा शहर में मुफ़्त घर से पिकअप और ड्रॉप — घर बैठे कार की सर्विस।',
    },
    description: {
      en: 'Busy day? We’ll come to you. Our trained drivers pick up your car from your home or office, bring it to the workshop and return it after the service. You get updates on WhatsApp throughout and pay only after you’re happy.',
      hi: 'व्यस्त हैं? हम आपके पास आएँगे। हमारे प्रशिक्षित ड्राइवर आपके घर या ऑफ़िस से कार लेकर वर्कशॉप लाते हैं और सर्विस के बाद वापस पहुँचाते हैं। पूरे समय व्हाट्सऐप पर अपडेट मिलते हैं और भुगतान संतुष्ट होने के बाद ही।',
    },
    benefits: {
      en: ['Free within Rewa city limits', 'Trained, verified drivers', 'WhatsApp updates throughout', 'Pay after delivery', 'Same-day service for most jobs'],
      hi: ['रीवा शहर में मुफ़्त', 'प्रशिक्षित, सत्यापित ड्राइवर', 'पूरे समय व्हाट्सऐप अपडेट', 'डिलीवरी के बाद भुगतान', 'ज़्यादातर काम उसी दिन'],
    },
    image: unsplash('1663852397535-18292e115327'),
    alt: { en: 'White Maruti Suzuki Swift being driven on an open road', hi: 'खुली सड़क पर चलती सफ़ेद मारुति सुज़ुकी स्विफ़्ट' },
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
