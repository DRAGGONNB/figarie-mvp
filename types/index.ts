import { Database } from './database'

export type Lead = Database['public']['Tables']['leads']['Row']
export type ServiceCatalog = Database['public']['Tables']['services_catalog']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']

export interface ServiceQuestion {
  field: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface BookingFormData {
  service_type: string
  name: string
  surname: string
  email: string
  mobile: string
  [key: string]: string | number | boolean
}
