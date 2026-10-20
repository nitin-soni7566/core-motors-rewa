import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { brands } from '../data/brands.js'
import { services } from '../data/services.js'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

const today = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const emptyForm = (service = '') => ({
  name: '',
  phone: '',
  brand: '',
  model: '',
  year: '',
  service,
  date: '',
  message: '',
})

// Accepts 10-digit Indian mobiles, optionally prefixed with +91, 91 or 0.
const normalisePhone = (value) => value.replace(/[\s-]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '')

function validate(values) {
  const errors = {}
  const year = Number(values.year)
  const maxYear = new Date().getFullYear() + 1

  // values are translation keys; vars are filled in when displayed
  if (values.name.trim().length < 2) errors.name = ['form.err.name']
  if (!/^[6-9]\d{9}$/.test(normalisePhone(values.phone))) errors.phone = ['form.err.phone']
  if (!values.brand) errors.brand = ['form.err.brand']
  if (values.year && (!/^\d{4}$/.test(values.year) || year < 1980 || year > maxYear))
    errors.year = ['form.err.year', { max: maxYear }]
  if (!values.service) errors.service = ['form.err.service']
  if (!values.date) errors.date = ['form.err.date']
  else if (values.date < today()) errors.date = ['form.err.past']
  return errors
}

// Always written in English so the workshop receives bookings in one consistent format.
function buildMessage(v) {
  const serviceTitle = services.find((s) => s.slug === v.service)?.title.en ?? v.service
  const [y, m, d] = v.date.split('-')
  const lines = [
    `*New Service Booking — ${siteConfig.name}*`,
    '',
    `*Name:* ${v.name.trim()}`,
    `*Phone:* ${normalisePhone(v.phone)}`,
    `*Car:* ${[v.brand, v.model.trim(), v.year && `(${v.year})`].filter(Boolean).join(' ')}`,
    `*Service:* ${serviceTitle}`,
    `*Preferred Date:* ${d}/${m}/${y}`,
  ]
  if (v.message.trim()) lines.push(`*Message:* ${v.message.trim()}`)
  return lines.join('\n')
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingForm({ defaultService = '', onSuccess }) {
  const uid = useId()
  const { t, tx } = useLang()
  const err = (name) => errors[name] && t(...errors[name])
  const [values, setValues] = useState(() => emptyForm(defaultService))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null) // holds the WhatsApp URL after submit

  const id = (name) => `${uid}-${name}`
  const inputProps = (name) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: (e) => {
      setValues((v) => ({ ...v, [name]: e.target.value }))
      if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest)
    },
    className: `input ${errors[name] ? 'input-error' : ''}`,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(id(Object.keys(found)[0]))?.focus()
      return
    }
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(buildMessage(values))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(url)
    setValues(emptyForm(defaultService))
    onSuccess?.()
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 text-center"
          role="status"
        >
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-11 w-11 text-green-500" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold text-ink">{t('form.success.title')}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{t('form.success.text')}</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <a href={submitted} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent underline">
              {t('form.success.retry')}
            </a>
            <button type="button" onClick={() => setSubmitted(null)} className="btn-dark">
              {t('form.success.again')}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field id={id('name')} label={t('form.name')} required error={err('name')}>
            <input type="text" autoComplete="name" placeholder={t('form.namePh')} {...inputProps('name')} />
          </Field>
          <Field id={id('phone')} label={t('form.phone')} required error={err('phone')}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder={t('form.phonePh')} maxLength={15} {...inputProps('phone')} />
          </Field>
          <Field id={id('brand')} label={t('form.brand')} required error={err('brand')}>
            <select {...inputProps('brand')}>
              <option value="">{t('form.brandPh')}</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
              <option value="Other">{t('form.other')}</option>
            </select>
          </Field>
          <Field id={id('model')} label={t('form.model')}>
            <input type="text" placeholder={t('form.modelPh')} {...inputProps('model')} />
          </Field>
          <Field id={id('year')} label={t('form.year')} error={err('year')}>
            <input type="text" inputMode="numeric" placeholder={t('form.yearPh')} maxLength={4} {...inputProps('year')} />
          </Field>
          <Field id={id('service')} label={t('form.service')} required error={err('service')}>
            <select {...inputProps('service')}>
              <option value="">{t('form.servicePh')}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {tx(s.title)}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field id={id('date')} label={t('form.date')} required error={err('date')}>
              <input type="date" min={today()} {...inputProps('date')} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id={id('message')} label={t('form.message')}>
              <textarea rows={3} placeholder={t('form.messagePh')} {...inputProps('message')} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full">
              <Send className="h-4 w-4" aria-hidden="true" /> {t('form.submit')}
            </button>
            <p className="mt-3 text-center text-xs text-subtle">{t('form.note')}</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
