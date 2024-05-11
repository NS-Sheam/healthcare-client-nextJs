export interface IDoctor {
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties: ISpecialties[];
}
export interface ISpecialties {
  nspecialtiesId: string;
  isDeleted?: null;
}

export interface IDoctorFormData {
  doctor: IDoctor;
  password: string;
}
