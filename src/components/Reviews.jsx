import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Quote, Star } from 'lucide-react'
import { reviews } from '../data/reviews.js'
import { useLang } from '../context/LanguageContext.jsx'
import SectionTitle from './SectionTitle.jsx'
import 'swiper/css'
import 'swiper/css/pagination'

function Stars({ rating }) {
  const { t } = useLang()
  return (
    <div className="flex gap-0.5" role="img" aria-label={t('reviews.stars', { n: rating })}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-line'}`} aria-hidden="true" />
      ))}
    </div>
  )
}

export default function Reviews() {
  const { t, tx } = useLang()
  return (
    <section className="section overflow-hidden bg-surface-2">
      <div className="container-x">
        <SectionTitle eyebrow={t('reviews.eyebrow')} title={t('reviews.title')} subtitle={t('reviews.subtitle')} />
        <Swiper
          modules={[Autoplay, Pagination]}
          className="reviews-swiper !pb-14"
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.name} className="!h-auto">
              <figure className="card relative flex h-full flex-col p-8 hover:border-accent/30">
                <Quote className="absolute top-7 right-7 h-12 w-12 text-accent/10" aria-hidden="true" />
                <Stars rating={r.rating} />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/80">“{tx(r.text)}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark font-heading text-sm font-semibold text-white">
                    {r.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                  <span>
                    <span className="block font-heading font-semibold text-ink">{r.name}</span>
                    <span className="block text-xs text-subtle">{r.car}</span>
                  </span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
