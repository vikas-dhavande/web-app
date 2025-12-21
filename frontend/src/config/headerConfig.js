export const headerConfig = {
    logo: {
        text: "MEDPORTAL",
        subtext: "HEALTHCARE",
        href: "/",
        // image: "/path/to/logo.svg" // Future support
    },
    search: {
        placeholders: [
            "Search hospitals, doctors, colleges...",
            "Find clinics, medicines, medical courses...",
            "Book appointments with specialists..."
        ]
    },
    menu: [
        { id: 'home', label: 'Home', link: '/' },
        { id: 'hospitals', label: 'Hospitals', link: '/hospitals' },
        { id: 'clinics', label: 'Clinics', link: '/clinics' },
        { id: 'pharma', label: 'Pharma', link: '/eshop' }, // Pointing to EShop for now
        { id: 'colleges', label: 'Medical Colleges', link: '/colleges' },
        { id: 'doctors', label: 'Doctors', link: '/doctors' },
        { id: 'blog', label: 'Blog', link: '/blog' },
    ],
    contactInfo: {
        phone: "+91-1234567890",
        email: "support@medportal.com",
        location: "MedTech Park, Bangalore"
    }
};
