'use client';

import {CalendarIcon, HomeIcon, PlusCircleIcon, AcademicCapIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: 'Модульный журнал', href:
            '/dashboard/mj-oauth'
        , icon: AcademicCapIcon
    },
    {
        name: 'Домашняя Страница', href:
            '/dashboard'
        , icon: HomeIcon
    },
    {
        name: 'Расписание',
        href: '/dashboard/schedule',
        icon: CalendarIcon,
    },
    {
        name: 'Загрузка расписания',
        href: '/dashboard/schedule/upload',
        icon: CalendarIcon,
    },
    {
        name: 'Управление заданиями',
        href: '/dashboard/test/create',
        icon: PlusCircleIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
