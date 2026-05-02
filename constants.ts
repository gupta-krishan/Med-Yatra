export interface Treatment {
  id: string;
  name: string;
  category: string;
  description: string;
  avgCostIndia: string;
  avgCostUSA: string;
  recoveryTime: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'cardiac-bypass',
    name: 'Cardiac Bypass (CABG)',
    category: 'Cardiology',
    description: 'A surgical procedure to restore blood flow to your heart muscle by diverting the flow of blood around a blocked artery.',
    avgCostIndia: '$5,000 - $8,000',
    avgCostUSA: '$120,000+',
    recoveryTime: '6-8 weeks'
  },
  {
    id: 'knee-replacement',
    name: 'Total Knee Replacement',
    category: 'Orthopedics',
    description: 'A surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.',
    avgCostIndia: '$4,000 - $6,000',
    avgCostUSA: '$40,000 - $50,000',
    recoveryTime: '4-6 weeks'
  },
  {
    id: 'ivf-treatment',
    name: 'IVF (In Vitro Fertilization)',
    category: 'Fertility',
    description: 'A complex series of procedures used to help with fertility or prevent genetic problems and assist with the conception of a child.',
    avgCostIndia: '$3,000 - $5,000',
    avgCostUSA: '$15,000 - $20,000',
    recoveryTime: '2 weeks'
  },
  {
    id: 'liver-transplant',
    name: 'Liver Transplant',
    category: 'Transplants',
    description: 'A surgical procedure that replaces a failing liver with a healthy liver from another person.',
    avgCostIndia: '$25,000 - $35,000',
    avgCostUSA: '$600,000+',
    recoveryTime: '3-6 months'
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    category: 'Dentistry',
    description: 'A surgical component that interfaces with the bone of the jaw or skull to support a dental prosthesis.',
    avgCostIndia: '$500 - $800',
    avgCostUSA: '$3,000 - $5,000',
    recoveryTime: '1-2 weeks'
  },
  {
    id: 'lasik',
    name: 'LASIK Eye Surgery',
    category: 'Ophthalmology',
    description: 'A type of refractive surgery for the correction of myopia, hyperopia, and astigmatism.',
    avgCostIndia: '$600 - $1,000',
    avgCostUSA: '$4,000 - $5,000',
    recoveryTime: '24-48 hours'
  },
  {
    id: 'chemotherapy',
    name: 'Chemotherapy Session',
    category: 'Oncology',
    description: 'A type of cancer treatment that uses one or more anti-cancer drugs as part of a standardized chemotherapy regimen.',
    avgCostIndia: '$200 - $1,000',
    avgCostUSA: '$5,000 - $10,000',
    recoveryTime: 'Varies'
  },
  {
    id: 'hip-replacement',
    name: 'Hip Replacement',
    category: 'Orthopedics',
    description: 'A surgical procedure in which the hip joint is replaced by a prosthetic implant.',
    avgCostIndia: '$5,000 - $7,000',
    avgCostUSA: '$40,000+',
    recoveryTime: '6-12 weeks'
  }
];
