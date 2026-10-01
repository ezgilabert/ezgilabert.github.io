/**
 * experience.js
 * i18nKey apunta a TRANSLATIONS[lang][i18nKey] que contiene el array de bullets.
 * Used by: render-experience.js.
 */

window.EXPERIENCE_DATA = [
    {
        role: 'Senior .NET Full Stack Developer',
        roleKey: 'role_kopius',
        company: 'Kopius Tech (Home Care & Home Base)',
        companyParts: [
            { text: 'Kopius Tech', href: 'https://kopiustech.com/' },
            { text: ' (' },
            { text: 'Home Care & Home Base', href: 'https://hchb.com/' },
            { text: ')' }
        ],
        dates: '06/2022 - 07/2026',
        tech: 'GitHub Copilot, MCP, Blazor WebAssembly, Angular, TypeScript, WinForms, .NET Core 8, .NET Framework 4.6.2, Dapper, SQL Server, Git, Azure, Kubernetes',
        languageKey: 'experience_language_english',
        i18nKey: 'lists.experience.kopius',
        expanded: true
    },
    {
        role: 'Ssr Full Stack Developer',
        roleKey: 'role_axonier',
        company: 'Axonier Consulting (Assist-Card)',
        companyParts: [
            { text: 'Axonier Consulting', href: 'https://axonier.com/' },
            { text: ' (' },
            { text: 'Assist-Card', href: 'https://www.assistcard.com/ar' },
            { text: ')' }
        ],
        dates: '03/2021 - 06/2022',
        tech: 'Razor, jQuery, JavaScript, .NET Core 5.0, .NET Framework 4.6.2, SQL Server, Git, TFS, Azure',
        i18nKey: 'lists.experience.axonier'
    },
    {
        role: 'Ssr Full Stack Developer',
        roleKey: 'role_arrow',
        company: 'Software Arrow',
        companyParts: [
            { text: 'Software Arrow', href: 'https://www.linkedin.com/company/68165214' },
        ],
        dates: '12/2019 - 12/2020',
        tech: 'Angular 8, TypeScript, Laravel, .NET Core 3.1, Entity Framework, PostgreSQL, Bootstrap, Git, GitLab',
        i18nKey: 'lists.experience.arrow'
    },
    {
        role: 'Jr. Full Stack Developer',
        roleKey: 'role_octubre',
        company: 'Grupo Octubre',
        companyParts: [
            { text: 'Grupo Octubre', href: 'https://octubre.com/' }
        ],
        dates: '02/2017 - 12/2019',
        tech: 'JavaScript (Vanilla), Angular 2, .NET Framework, NHibernate, PostgreSQL, SQL Server, Crystal Reports, Git, GitLab',
        i18nKey: 'lists.experience.octubre'
    }
];