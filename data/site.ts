import siteData from './site.json';
import type { SiteData } from '~/types/site';

const typedData = siteData as SiteData;

export const { profile, skills, services, works, career, contact, links } = typedData;
export default typedData;
