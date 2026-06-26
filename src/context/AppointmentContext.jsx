import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export function useAppointment() {
  return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
  const [step, setStep] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    insurance: '',
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Move forward in the wizard
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  
  // Move backward in the wizard
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Reset the wizard state
  const resetWizard = () => {
    setStep(1);
    setSelectedCondition('');
    setSelectedTreatment('');
    setSelectedProvider('');
    setSelectedDate('');
    setSelectedTime('');
    setPatientDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      insurance: '',
      comments: '',
    });
    setBookingSuccess(false);
    setGeneratedBookingId('');
  };

  // Submit the booking to localStorage (mock backend)
  const submitAppointment = async () => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const bookingId = 'APS-' + Math.floor(100000 + Math.random() * 900000);
    
    const newLead = {
      id: bookingId,
      type: 'appointment',
      dateCreated: new Date().toISOString(),
      status: 'New', // Lead stage: New, Contacted, Consultation Scheduled, Converted, Closed
      condition: selectedCondition,
      treatment: selectedTreatment,
      provider: selectedProvider,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      patient: patientDetails,
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('APS_LEADS') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('APS_LEADS', JSON.stringify(existingLeads));
      
      setGeneratedBookingId(bookingId);
      setBookingSuccess(true);
      setStep(5); // Go to final confirmation screen
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    step,
    setStep,
    selectedCondition,
    setSelectedCondition,
    selectedTreatment,
    setSelectedTreatment,
    selectedProvider,
    setSelectedProvider,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    patientDetails,
    setPatientDetails,
    isSubmitting,
    bookingSuccess,
    generatedBookingId,
    nextStep,
    prevStep,
    resetWizard,
    submitAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}
