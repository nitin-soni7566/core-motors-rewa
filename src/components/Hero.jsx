import { useState, useSyncExternalStore } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Car, Phone, Truck } from 'lucide-react'
import { heroSlides as slides, heroSrcSet } from '../data/hero.js'
import { telLink } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { isIntroDone, subscribeIntro } from '../context/introStore.js'
import SandName from './SandName.jsx'
import 'swiper/css'
import 'swiper/css/effect-fade'


const facts = [
  { icon: Car, key: 'hero.fact1' },
  { icon: BadgeCheck, key: 'hero.fact2' },
  { icon: Truck, key: 'hero.fact3' },
]

// Transparent background: a soft shadow keeps the particles readable over bright photos
// (a static gradient, not a CSS filter — filters are recomputed every animation frame)
const heroSandBackdrop = 'bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.3)_45%,transparent_72%)]'

const rise = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { openBooking } = useBooking()
  const { t, tx } = useLang()
  const [active, setActive] = useState(0)
  const [swiper, setSwiper] = useState(null)
  const introDone = useSyncExternalStore(subscribeIntro, isIntroDone, () => false)
  const reduceMotion = useReducedMotion() // no auto-advancing slides for visitors who ask for less motion

  return (
    <section aria-label={t('hero.label')} className="relative overflow-hidden bg-charcoal">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1100}
        autoplay={reduceMotion ? false : { delay: 6500, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="h-[calc(100svh-4rem)] max-h-[880px] min-h-[750px] md:h-[calc(100svh-7.5rem)] xl:min-h-[600px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.key}>
            {({ isActive }) => (
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  srcSet={heroSrcSet(slide.image)}
                  sizes="100vw"
                  alt={tx(slide.alt)}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchpriority={i === 0 ? 'high' : 'auto'}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" aria-hidden="true" />
                <div className="relative container-x flex h-full items-center">
                  {/* before Swiper starts (and in the pre-rendered HTML) show the first slide's text */}
                  {(isActive || (!swiper && i === 0)) && (
                    <div className="max-w-2xl pt-44 pb-28 text-white md:pt-52 md:pb-24 xl:pt-0">
                      <motion.span
                        {...rise(0)}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md"
                      >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                        {t(`${slide.key}.eyebrow`)}
                      </motion.span>
                      {/* Only the active slide's text is rendered, so the page always has exactly one <h1> */}
                      <motion.h1
                        {...rise(0.12)}
                        className="font-heading text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
                      >
                        {t(`${slide.key}.title`)}{' '}
                        <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                          {t(`${slide.key}.accent`)}
                        </span>
                      </motion.h1>
                      <motion.p {...rise(0.26)} className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                        {t(`${slide.key}.text`)}
                      </motion.p>
                      <motion.div {...rise(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <button type="button" onClick={() => openBooking()} className="btn-primary group">
                          {t('common.bookService')}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </button>
                        <a href={telLink} className="btn-outline">
                          <Phone className="h-4 w-4" aria-hidden="true" /> {t('common.callNow')}
                        </a>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Sand-particle brand mark (transparent): compact at the top below 1280px, top-right on wide screens */}
      <div className="pointer-events-none absolute inset-x-0 top-5 z-10 md:top-7 xl:hidden">
        <div className="container-x">
          <div className={`pointer-events-auto mx-auto h-[150px] max-w-md md:h-[170px] ${heroSandBackdrop}`}>
            <SandName play={introDone} label={null} fillHeight={0.92} />
          </div>
        </div>
      </div>
      <div className={`absolute top-[8%] right-8 z-10 hidden h-[240px] w-[520px] xl:block 2xl:right-10 2xl:h-[270px] 2xl:w-[600px] ${heroSandBackdrop}`}>
        <SandName play={introDone} label={null} fillHeight={0.92} />
      </div>

      {/* Bottom glass bar: quick facts + slide controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="container-x pb-6 md:pb-8">
          <div className="pointer-events-auto flex items-end justify-between gap-6">
            <ul className="hidden flex-1 grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl lg:grid lg:max-w-3xl">
              {facts.map((f, i) => (
                <li key={f.key} className={`flex items-center gap-3 px-5 py-4 ${i ? 'border-l border-white/10' : ''}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/90 text-white">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-heading text-sm font-semibold text-white">{t(`${f.key}.title`)}</span>
                    <span className="block text-xs text-neutral-400">{t(`${f.key}.text`)}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-white">
              <span className="font-heading text-sm tabular-nums">
                <span className="text-2xl font-semibold">{String(active + 1).padStart(2, '0')}</span>
                <span className="text-neutral-400"> / {String(slides.length).padStart(2, '0')}</span>
              </span>
              <div className="flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    aria-current={active === i ? 'true' : undefined}
                    aria-label={`${i + 1} / ${slides.length}`}
                    onClick={() => swiper?.slideToLoop(i)}
                    className="relative h-1 w-10 overflow-hidden rounded-full bg-white/25"
                  >
                    {active === i && (
                      <motion.span
                        key={`bar-${i}-${active}`}
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 6.5, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
