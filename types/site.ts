export interface Profile {
  name: string
  title: string
  email: string
  lead: string
  about: string
}

export interface Skill {
  label: string
  color: string
  items: string
}

export interface Service {
  type: string
  category: string
  name: string
  description: string
  tech: string
  link: string
  linkLabel: string
  note: string
}

export interface Work {
  title: string
  description: string
  tech: string
  link: string
}

export interface CareerItem {
  period: string
  title: string
  tech: string
}

export interface CareerPhase {
  company: string
  period: string
  items: CareerItem[]
}

export interface ContactDetail {
  label: string
  value: string
}

export interface Contact {
  description: string
  details: ContactDetail[]
}

export interface Links {
  github: string
}

export interface SiteData {
  profile: Profile
  skills: Skill[]
  services: Service[]
  works: Work[]
  career: CareerPhase[]
  contact: Contact
  links: Links
}
