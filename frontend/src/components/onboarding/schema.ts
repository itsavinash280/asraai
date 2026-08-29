/**
 * Field schema for the onboarding wizard.
 *
 * The wizard is schema-driven rather than four hand-written forms: each role
 * contributes a list of field descriptors, and one renderer + one validator
 * handle them all. Adding a question to a role is a one-line change here.
 */
import { UserRole } from '../../types';

export type FieldKind = 'text' | 'number' | 'select' | 'chips' | 'textarea';

export interface SelectOption {
  value: string;
  label: string;
  labelHi?: string;
}

export interface FieldDef {
  /** Dotted path into the draft, e.g. "bankAccount.ifscCode". */
  key: string;
  label: string;
  labelHi?: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: SelectOption[];
  /** Tap-to-add presets for `chips` fields. */
  suggestions?: string[];
  /** Fields sharing a heading are drawn together under it. */
  section?: string;
  /** Half-width on wide screens. */
  half?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Step 1 — common to every role                                             */
/* -------------------------------------------------------------------------- */

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman & Nicobar Islands',
  'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Jammu & Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const COMMON_FIELDS: FieldDef[] = [
  {
    key: 'state',
    label: 'State',
    labelHi: 'राज्य',
    kind: 'select',
    required: true,
    half: true,
    options: INDIAN_STATES.map((s) => ({ value: s, label: s })),
  },
  {
    key: 'district',
    label: 'District',
    labelHi: 'ज़िला',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'Bareilly',
  },
  {
    key: 'pincode',
    label: 'PIN code',
    labelHi: 'पिन कोड',
    kind: 'text',
    required: true,
    half: true,
    placeholder: '243001',
    hint: 'Six digits — used for weather and nearby mandi rates.',
  },
  {
    key: 'preferredLanguage',
    label: 'Preferred language',
    labelHi: 'पसंदीदा भाषा',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'HI', label: 'Hindi', labelHi: 'हिन्दी' },
      { value: 'EN', label: 'English', labelHi: 'अंग्रेज़ी' },
      { value: 'HINGLISH', label: 'Hinglish', labelHi: 'हिंग्लिश' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Step 2 — role specific                                                    */
/* -------------------------------------------------------------------------- */

const FARMER_FIELDS: FieldDef[] = [
  {
    key: 'farmSizeAcres',
    label: 'Farm size (acres)',
    labelHi: 'खेत का आकार',
    kind: 'number',
    required: true,
    half: true,
    placeholder: '3.5',
  },
  {
    key: 'soilType',
    label: 'Soil type',
    labelHi: 'मिट्टी का प्रकार',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'ALLUVIAL', label: 'Alluvial', labelHi: 'जलोढ़' },
      { value: 'BLACK', label: 'Black', labelHi: 'काली' },
      { value: 'RED', label: 'Red', labelHi: 'लाल' },
      { value: 'SANDY', label: 'Sandy', labelHi: 'बलुई' },
      { value: 'CLAY', label: 'Clay', labelHi: 'चिकनी' },
    ],
  },
  {
    key: 'irrigationSource',
    label: 'Irrigation source',
    labelHi: 'सिंचाई का साधन',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'TUBEWELL', label: 'Tubewell', labelHi: 'ट्यूबवेल' },
      { value: 'CANAL', label: 'Canal', labelHi: 'नहर' },
      { value: 'RAINFED', label: 'Rainfed', labelHi: 'वर्षा आधारित' },
      { value: 'DRIP', label: 'Drip', labelHi: 'ड्रिप' },
    ],
  },
  {
    key: 'nearestMandi',
    label: 'Nearest mandi',
    labelHi: 'निकटतम मंडी',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'Bareilly APMC Mandi',
  },
  {
    key: 'primaryCrops',
    label: 'Primary crops',
    labelHi: 'मुख्य फसलें',
    kind: 'chips',
    required: true,
    hint: 'Type a crop and press Enter, or tap a suggestion.',
    suggestions: ['Paddy', 'Wheat', 'Sugarcane', 'Mustard', 'Potato', 'Tomato', 'Maize', 'Pulses'],
  },
  {
    key: 'bankAccount.accountHolder',
    label: 'Account holder',
    kind: 'text',
    half: true,
    section: 'Bank account — optional, for direct DBT payouts',
    placeholder: 'As printed on the passbook',
  },
  {
    key: 'bankAccount.bankName',
    label: 'Bank name',
    kind: 'text',
    half: true,
    section: 'Bank account — optional, for direct DBT payouts',
    placeholder: 'State Bank of India',
  },
  {
    key: 'bankAccount.ifscCode',
    label: 'IFSC code',
    kind: 'text',
    half: true,
    section: 'Bank account — optional, for direct DBT payouts',
    placeholder: 'SBIN0001234',
  },
];

const BUYER_FIELDS: FieldDef[] = [
  {
    key: 'firmName',
    label: 'Firm name',
    labelHi: 'फर्म का नाम',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'Harvest Organics Pvt Ltd',
  },
  {
    key: 'buyerType',
    label: 'Buyer type',
    labelHi: 'खरीदार का प्रकार',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'WHOLESALER', label: 'Wholesaler', labelHi: 'थोक विक्रेता' },
      { value: 'RETAILER', label: 'Retailer', labelHi: 'खुदरा विक्रेता' },
      { value: 'FOOD_PROCESSOR', label: 'Food processor', labelHi: 'खाद्य प्रसंस्करण' },
      { value: 'EXPORTER', label: 'Exporter', labelHi: 'निर्यातक' },
    ],
  },
  {
    key: 'gstin',
    label: 'GSTIN (optional)',
    kind: 'text',
    half: true,
    placeholder: '09ABCDE1234F1Z5',
    hint: '15 characters.',
  },
  {
    key: 'apmcLicense',
    label: 'APMC licence (optional)',
    kind: 'text',
    half: true,
    placeholder: 'APMC/UP/2024/1180',
  },
  {
    key: 'interestedCommodities',
    label: 'Commodities you buy',
    labelHi: 'रुचि की उपज',
    kind: 'chips',
    required: true,
    hint: 'Type a commodity and press Enter, or tap a suggestion.',
    suggestions: ['Rice', 'Wheat', 'Potato', 'Onion', 'Tomato', 'Soybean', 'Cotton', 'Mango'],
  },
  {
    key: 'deliveryWarehouseAddress',
    label: 'Delivery / warehouse address',
    labelHi: 'गोदाम का पता',
    kind: 'textarea',
    required: true,
    placeholder: 'Plot 14, Transport Nagar, Bareilly, Uttar Pradesh 243001',
  },
];

const EXPERT_FIELDS: FieldDef[] = [
  {
    key: 'designation',
    label: 'Designation',
    labelHi: 'पदनाम',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'Senior Agronomist',
  },
  {
    key: 'kvkCenter',
    label: 'KVK / research centre',
    labelHi: 'केवीके केंद्र',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'KVK Bareilly / ICAR IISR',
  },
  {
    key: 'icarRegistrationNo',
    label: 'ICAR registration no.',
    labelHi: 'आईसीएआर पंजीकरण',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'ICAR/AGR/2019/44127',
  },
  {
    key: 'specialization',
    label: 'Specialisation',
    labelHi: 'विशेषज्ञता',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'PEST_DISEASE', label: 'Pest & disease', labelHi: 'कीट एवं रोग' },
      { value: 'SOIL_HEALTH', label: 'Soil health', labelHi: 'मृदा स्वास्थ्य' },
      { value: 'CROP_MANAGEMENT', label: 'Crop management', labelHi: 'फसल प्रबंधन' },
      { value: 'ORGANIC_FARMING', label: 'Organic farming', labelHi: 'जैविक खेती' },
    ],
  },
];

const TRANSPORT_FIELDS: FieldDef[] = [
  {
    key: 'companyName',
    label: 'Company name',
    labelHi: 'कंपनी का नाम',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'Verma Agro Fleet Services',
  },
  {
    key: 'vehicleType',
    label: 'Vehicle type',
    labelHi: 'वाहन का प्रकार',
    kind: 'select',
    required: true,
    half: true,
    options: [
      { value: 'PICKUP_1TON', label: 'Pickup — 1 ton', labelHi: 'पिकअप' },
      { value: 'TRUCK_10TON', label: 'Truck — 10 ton', labelHi: 'ट्रक' },
      { value: 'CONTAINER_20TON', label: 'Container — 20 ton', labelHi: 'कंटेनर' },
    ],
  },
  {
    key: 'vehicleRegNo',
    label: 'Vehicle registration no.',
    labelHi: 'वाहन संख्या',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'UP 25 AB 1234',
  },
  {
    key: 'driverLicenseNo',
    label: 'Driving licence no.',
    labelHi: 'ड्राइविंग लाइसेंस',
    kind: 'text',
    required: true,
    half: true,
    placeholder: 'UP2520190001234',
  },
];

export interface RoleCopy {
  /** Heading for the role-specific step. */
  title: string;
  titleHi: string;
  blurb: string;
  fields: FieldDef[];
}

export const ROLE_STEP: Record<UserRole, RoleCopy> = {
  FARMER: {
    title: 'Your farm',
    titleHi: 'किसान',
    blurb: 'These details train the crop, disease and price models on your land, not an average one.',
    fields: FARMER_FIELDS,
  },
  BUYER: {
    title: 'Your firm',
    titleHi: 'थोक खरीदार',
    blurb: 'We match you to verified farmer lots for the commodities you actually procure.',
    fields: BUYER_FIELDS,
  },
  EXPERT: {
    title: 'Your credentials',
    titleHi: 'कृषि विशेषज्ञ',
    blurb: 'Consultations are routed to you by specialisation, so farmers reach the right desk.',
    fields: EXPERT_FIELDS,
  },
  TRANSPORT: {
    title: 'Your fleet',
    titleHi: 'लॉजिस्टिक्स',
    blurb: 'Dispatch offers are filtered by your vehicle capacity and operating district.',
    fields: TRANSPORT_FIELDS,
  },
  ADMIN: {
    title: 'Platform administration',
    titleHi: 'प्रशासक',
    blurb: 'Administrator accounts need no additional professional details.',
    fields: [],
  },
};
