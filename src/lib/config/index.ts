import config from 'config.json'

type Index = {
  readonly site_url: string
  readonly site_title: string
  readonly site_description: string
  readonly email: string
  readonly github: string
  readonly instagram: string
  readonly linkedin: string
  readonly site_keywords: { keyword: string }[]
}

export default config as Index
