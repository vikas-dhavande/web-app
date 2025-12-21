const getStats = async (req, res) => {
    try {
        // Mock data - in production this would come from a database model
        const statsData = [
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

        res.status(200).json({
            success: true,
            data: statsData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getStats
};
