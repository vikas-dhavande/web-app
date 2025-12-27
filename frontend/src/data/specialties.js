import {
    FaUserMd,
    FaTooth,
    FaHeartbeat,
    FaBrain,
    FaEye,
    FaLungs,
    FaSyringe,
    FaRibbon,
    FaBaby,
    FaLeaf,
    FaBone,
    FaDna,
    FaAppleAlt,
    FaWalking,
    FaStethoscope,
    FaPills,
    FaAssistiveListeningSystems,
    FaHandHoldingMedical
} from 'react-icons/fa';
import {
    MdPregnantWoman,
    MdBloodtype,
    MdFace,
    MdSanitizer
} from 'react-icons/md';
import {
    GiStomach,
    GiKidneys,
    GiJoint,
    GiLiver,
    GiNoseSide
} from 'react-icons/gi';

export const medicalSpecialties = [
    { name: "General Physician", type: "General Physician", icon: FaUserMd },
    { name: "Dentist", type: "Dentist", icon: FaTooth },
    { name: "Dermatologist", type: "Dermatologist", icon: MdFace },
    { name: "Gynaecologist", type: "Gynaecologist", icon: MdPregnantWoman },
    { name: "Homeopathy", type: "Homeopath", icon: FaLeaf },
    { name: "Ear, Nose, Throat", type: "ENT", icon: FaAssistiveListeningSystems },
    { name: "Orthopaedic", type: "Orthopedic", icon: FaBone },
    { name: "Paediatrician", type: "Paediatrician", icon: FaBaby },
    { name: "Ayurveda", type: "Ayurveda", icon: FaLeaf },
    { name: "Psychiatrist", type: "Psychiatrist", icon: FaBrain },
    { name: "Cardiologist", type: "Cardiologist", icon: FaHeartbeat },
    { name: "Gastro", type: "Gastroenterologist", icon: GiStomach },
    { name: "Neurologist", type: "Neurologist", icon: FaBrain },
    { name: "Ophthalmologist", type: "Ophthalmologist", icon: FaEye },
    { name: "Pulmonologist", type: "Pulmonologist", icon: FaLungs },
    { name: "Nephrologist", type: "Nephrologist", icon: GiKidneys },
    { name: "Diabetologist", type: "Diabetologist", icon: MdBloodtype },
    { name: "Dietician", type: "Dietitian", icon: FaAppleAlt },
    { name: "Endocrinologist", type: "Endocrinologist", icon: FaDna },
    { name: "Physiotherapist", type: "Physiotherapist", icon: FaWalking },
    { name: "General Surgeon", type: "General Surgeon", icon: FaStethoscope },
    { name: "Anesthesiologist", type: "Anesthesiologist", icon: FaSyringe },
    { name: "Urologist", type: "Urologist", icon: MdSanitizer },
    { name: "Oncologist", type: "Oncologist", icon: FaRibbon },
    { name: "Audiologist", type: "Audiologist", icon: FaAssistiveListeningSystems },
    { name: "Rheumatologist", type: "Rheumatologist", icon: GiJoint },
];
