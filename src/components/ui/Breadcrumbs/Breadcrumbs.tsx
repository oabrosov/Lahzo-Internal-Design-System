import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import { Icon } from '../Icon';

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page (and it's implied for the last item). */
  href?: string;
  /** Optional leading 16px Phosphor icon. Icons are all-or-nothing: if any item has one, every item must. */
  icon?: PhosphorIcon;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Trails longer than this collapse to: first · … · last. */
const COLLAPSE_AFTER = 4;

function Crumb({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  const content = (
    <>
      {item.icon ? <Icon icon={item.icon} size={16} /> : null}
      {item.label}
    </>
  );

  if (current || !item.href) {
    return (
      <li>
        <span aria-current="page" className="text-base-content">
          {content}
        </span>
      </li>
    );
  }

  return (
    <li>
      <a href={item.href} className="text-base-content/80">
        {content}
      </a>
    </li>
  );
}

/**
 * Breadcrumb trail. Pass `items`; the last item (or any item without `href`) renders as the
 * current page. Long trails collapse to first · … · last. Separator and hover styling come
 * from the theme.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (import.meta.env.DEV) {
    const withIcons = items.filter((item) => item.icon).length;
    if (withIcons !== 0 && withIcons !== items.length) {
      console.warn(
        'Breadcrumbs: icons are all-or-nothing — give every item an `icon`, or none.',
      );
    }
  }

  const collapsed = items.length > COLLAPSE_AFTER;
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={cn('breadcrumbs text-body', className)}>
      <ol>
        {collapsed ? (
          <>
            <Crumb item={items[0]} current={false} />
            <li>
              <span aria-hidden="true" className="text-base-content/80">
                …
              </span>
            </li>
            <Crumb item={items[lastIndex]} current />
          </>
        ) : (
          items.map((item, i) => (
            <Crumb key={`${item.label}-${i}`} item={item} current={i === lastIndex} />
          ))
        )}
      </ol>
    </nav>
  );
}
