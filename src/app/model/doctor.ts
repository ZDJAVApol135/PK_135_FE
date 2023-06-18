export interface Doctor {
  id: number;
  specialization: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber: string;
  title?: string;
}
