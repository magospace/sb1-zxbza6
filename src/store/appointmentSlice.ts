import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  id: string;
  clinicId: string;
  petName: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
  },
});

export const { addAppointment, updateAppointment, removeAppointment, setAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;