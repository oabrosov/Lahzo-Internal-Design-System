import {
  DotsThreeVertical,
  Export,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { LahzoWordmark } from '@/components/ui/Logo';
import { ThemeToggle } from '@/theme/ThemeToggle';

const stats = [
  { label: 'Total members', value: '128' },
  { label: 'Active this week', value: '94' },
  { label: 'Pending invites', value: '7' },
];

const members = [
  { name: 'Aria Khoury', email: 'aria@lahzo.app', role: 'Admin', initials: 'AK' },
  { name: 'Mateo Rossi', email: 'mateo@lahzo.app', role: 'Editor', initials: 'MR' },
  { name: 'Lena Park', email: 'lena@lahzo.app', role: 'Viewer', initials: 'LP' },
];

/**
 * Example product screen shipped with the template — a small "team members"
 * page composed from the design system. Replace it with your own screens.
 */
export function DashboardExample() {
  return (
    <div className="min-h-screen">
      <header className="flex h-16 items-center gap-6 border-b-[1.5px] border-base-300 bg-base-100 px-6">
        <div className="flex items-center gap-4">
          <LahzoWordmark className="text-base-content" />
          <div className="h-4 w-[1.5px] bg-base-300" />
          <span className="font-display text-2xl leading-none">Internal tools</span>
        </div>
        <div className="flex-1" />
        <ThemeToggle />
        <div className="flex size-10 items-center justify-center rounded bg-base-200 text-label">
          AK
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-h1">Team members</h1>
            <p className="text-body text-base-content/80">Manage who can access this workspace.</p>
          </div>
          <Button variant="primary" leftIcon={Plus}>
            Add member
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <label className="input flex items-center gap-2 bg-base-200">
            <Icon icon={MagnifyingGlass} />
            <input
              type="text"
              className="grow"
              placeholder="Search members"
              aria-label="Search members"
            />
          </label>
          <Button variant="secondary" leftIcon={FunnelSimple}>
            Filter
          </Button>
          <Button variant="ghost" leftIcon={Export}>
            Export
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card border-[1.5px] border-base-300 bg-base-200 p-6">
              <p className="text-label text-base-content/80">{stat.label}</p>
              <p className="mt-2 text-display">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 card border-[1.5px] border-base-300 bg-base-200">
          <ul>
            {members.map((member) => (
              <li
                key={member.email}
                className="flex items-center gap-4 border-b-[1.5px] border-base-300 px-6 py-4 last:border-b-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded bg-base-100 text-label">
                  {member.initials}
                </div>
                <div className="grow">
                  <p className="text-h3">{member.name}</p>
                  <p className="text-caption text-base-content/80">{member.email}</p>
                </div>
                <span className="badge bg-base-100 text-label">{member.role}</span>
                <Button variant="ghost" square aria-label="More actions" leftIcon={DotsThreeVertical} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
