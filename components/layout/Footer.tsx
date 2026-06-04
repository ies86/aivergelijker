import Link from 'next/link'
import { CATEGORIEEN } from '@/lib/categories'
import { siteConfig } from '@/site.config'

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 inline-flex">
              <svg width="24" height="24" viewBox="0 0 26 26" className="shrink-0">
                <rect x="2" y="14" width="5" height="10" rx="1" fill={siteConfig.brandKleurDonker} />
                <rect x="10" y="9" width="5" height="15" rx="1" fill={siteConfig.brandKleurMidden} />
                <rect x="18" y="3" width="5" height="21" rx="1" fill={siteConfig.brandKleurLicht} />
              </svg>
              <span className="font-extrabold text-lg text-white tracking-tight" style={{ letterSpacing: '-0.025em' }}>
                {siteConfig.naam}<span className="text-white/40 font-bold">{siteConfig.domeinExtensie}</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed mt-2">
              {siteConfig.footerTagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Categorieën</h3>
            <ul className="space-y-2">
              {CATEGORIEEN.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {siteConfig.footerVergelijkingen.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Vergelijkingen</h3>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerVergelijkingen.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-surface-400 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {siteConfig.footerGuides.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-3">Guides</h3>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerGuides.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-surface-400 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-surface-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} {siteConfig.domein}, alle rechten voorbehouden.</span>
          <span className="flex items-center gap-2">
            <span>* Affiliate-links hebben geen invloed op onze beoordelingen.</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
