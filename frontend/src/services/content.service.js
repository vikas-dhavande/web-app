// This service handles content like Stats, Partners, etc.
// Currently migrated from Backend mock data. 
// Future: Fetch from Appwrite Collections.

class ContentService {

    async getStats() {
        // Mock data migrated from statsController.js
        return [
            {
                id: 1,
                label: "Hospitals",
                value: 5000,
                suffix: "+",
                icon: "FaHospital"
            },
            {
                id: 2,
                label: "Clinics",
                value: 600,
                suffix: "+",
                icon: "FaClinicMedical"
            },
            {
                id: 3,
                label: "Pharma & Suppliers",
                value: 900,
                suffix: "+",
                icon: "FaPills"
            },
            {
                id: 4,
                label: "Medical Colleges",
                value: 600,
                suffix: "+",
                icon: "FaUniversity"
            },
            {
                id: 5,
                label: "Doctors Connected",
                value: 800,
                suffix: "+",
                icon: "FaUserMd"
            }
        ];
    }

    async getPartners() {
        // Mock data migrated from partnersController.js
        return [
            {
                id: 1,
                name: "Apollo Hospitals",
                logoUrl: "https://cdn.worldvectorlogo.com/logos/apollo-hospitals-1.svg", // Using public URL for visual check
                altText: "Apollo Hospitals logo",
                category: "hospital",
                websiteUrl: "https://www.apollohospitals.com"
            },
            {
                id: 2,
                name: "Pfizer",
                logoUrl: "https://cdn.worldvectorlogo.com/logos/pfizer-2.svg",
                altText: "Pfizer logo",
                category: "pharma",
                websiteUrl: "https://www.pfizer.com"
            },
            {
                id: 3,
                name: "AIIMS",
                logoUrl: "https://upload.wikimedia.org/wikipedia/en/2/22/All_India_Institute_of_Medical_Sciences%2C_New_Delhi_logo.svg",
                altText: "AIIMS logo",
                category: "institution",
                websiteUrl: "https://www.aiims.edu"
            },
            {
                id: 4,
                name: "Fortis",
                logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Fortis_Healthcare_Logo.svg/1200px-Fortis_Healthcare_Logo.svg.png",
                altText: "Fortis logo",
                category: "hospital",
                websiteUrl: "https://www.fortishealthcare.com"
            }
        ];
    }
}

export default new ContentService();
