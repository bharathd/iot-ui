export interface UserDetails {
    customerName: string;
    mobileNumber: string;
    customerId: string;
}

export interface OrganizationConfig {
  organizationId: string;
  logo: string | null;
  backgroundImage: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  welcomeTitle: string | null;
  welcomeCaptions: string | null;
  websiteUrl: string | null;
}

export interface OrganizationDetails {
  organizationId: string;
  organizationType: string;
  organizationName: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  description: string;
  isActive: boolean;
  createdDate: number;
  config: OrganizationConfig;
}
