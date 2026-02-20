export interface SeoMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
}

export interface AnnouncementMessage {
  text: string
  link?: string
}

export interface TrustBadge {
  icon: string
  label: string
  description: string
}

export interface CustomerPhoto {
  id: string
  src: string
  alt: string
  customer: string
  product: string
}
