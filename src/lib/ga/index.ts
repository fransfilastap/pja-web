export const pageview = (url: string | URL) => {
  const { NEXT_PUBLIC_GOOGLE_ANALYTICS } = process.env
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.gtag('config', NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    path_url: url
  })
}

export type GoogleTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: GoogleTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
