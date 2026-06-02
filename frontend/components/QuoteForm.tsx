"use client";

import { FormEvent, useState } from "react";

type FormData = {
  propertyZip: string;
  squareFootage: string;
  propertyAgeRange: string;
  requestedServices: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  agentName: string;
  agentEmail: string;
};

const serviceOptions = [
  { value: "Standard Inspection", label: "Standard Home Inspection" },
  { value: "Radon Testing", label: "Radon Testing" },
  { value: "Mold Testing", label: "Mold / Air Quality" },
  { value: "Termite / WDO", label: "Termite / WDO Inspection" },
];

const ageRanges = [
  { value: "0-5 years", label: "0–5 years" },
  { value: "6-15 years", label: "6–15 years" },
  { value: "16-30 years", label: "16–30 years" },
  { value: "30+ years", label: "30+ years" },
];

const inputClass =
  "h-12 w-full border-2 border-black bg-white px-4 text-sm outline-none placeholder:text-black/30 focus:border-black focus:ring-0 transition-colors duration-150";

const labelClass = "flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.1em]";

const initialFormData: FormData = {
  propertyZip: "",
  squareFootage: "",
  propertyAgeRange: "",
  requestedServices: ["Standard Inspection"],
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  propertyAddress: "",
  agentName: "",
  agentEmail: "",
};

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function toggleService(service: string) {
    setFormData((current) => {
      const selected = current.requestedServices.includes(service)
        ? current.requestedServices.filter((item) => item !== service)
        : [...current.requestedServices, service];
      return { ...current, requestedServices: selected };
    });
  }

  function validateStepOne() {
    if (!formData.propertyZip.trim()) return "Zip code is required.";
    if (!formData.squareFootage.trim()) return "Square footage is required.";
    if (!Number.isInteger(Number(formData.squareFootage)) || Number(formData.squareFootage) <= 0)
      return "Square footage must be a positive number.";
    if (!formData.propertyAgeRange) return "Property age range is required.";
    if (formData.requestedServices.length === 0) return "Select at least one service.";
    return "";
  }

  function validateStepTwo() {
    if (!formData.clientName.trim()) return "Client name is required.";
    if (!formData.clientEmail.trim()) return "Client email is required.";
    if (!formData.clientPhone.trim()) return "Client phone is required.";
    if (!formData.propertyAddress.trim()) return "Property address is required.";
    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const stepTwoError = validateStepTwo();
    if (stepTwoError) { setErrorMessage(stepTwoError); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("submitted");
      setFormData(initialFormData);
      setCurrentStep(1);
    }, 1500);
  }

  function handleNextStep() {
    const error = validateStepOne();
    if (error) { setErrorMessage(error); return; }
    setErrorMessage("");
    setCurrentStep(2);
  }

  if (successMessage) {
    return (
      <div className="flex flex-col items-start gap-6 border-2 border-black p-10">
        <div className="flex h-14 w-14 items-center justify-center border-2 border-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Quote Request Received</h2>
          <p className="mt-3 text-base leading-7 text-black/60">
            An inspector will review your property specs and reach out via email or text with your quote within 2 hours.
          </p>
        </div>
        <button
          onClick={() => setSuccessMessage("")}
          className="btn-on-light inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Step indicator */}
      <div className="flex items-center gap-4">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center border-2 text-xs font-bold transition-colors duration-200 ${
                step === currentStep
                  ? "border-black bg-black text-white"
                  : step < currentStep
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black/30"
              }`}
            >
              {step < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : step}
            </div>
            <span className={`text-sm font-semibold uppercase tracking-widest ${step === currentStep ? "text-black" : "text-black/30"}`}>
              {step === 1 ? "Property" : "Contact"}
            </span>
            {step < 2 && <span className="ml-2 h-px w-8 bg-black/20" />}
          </div>
        ))}
      </div>

      {/* Error */}
      {errorMessage && (
        <div role="alert" className="border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Step 1 */}
      {currentStep === 1 && (
        <section className="flex flex-col gap-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Zip Code
              <input
                type="text"
                inputMode="numeric"
                value={formData.propertyZip}
                onChange={(e) => updateField("propertyZip", e.target.value)}
                placeholder="12345"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Square Footage
              <input
                type="number"
                min="1"
                value={formData.squareFootage}
                onChange={(e) => updateField("squareFootage", e.target.value)}
                placeholder="2400"
                className={inputClass}
              />
            </label>
          </div>

          <label className={labelClass}>
            Property Age Range
            <select
              value={formData.propertyAgeRange}
              onChange={(e) => updateField("propertyAgeRange", e.target.value)}
              className={inputClass}
            >
              <option value="">Select age range</option>
              {ageRanges.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </label>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-semibold uppercase tracking-[0.1em]">
              Requested Services
            </legend>
            <div className="grid gap-3 border-2 border-black p-4 sm:grid-cols-2">
              {serviceOptions.map((service) => (
                <label
                  key={service.value}
                  className="flex cursor-pointer items-center gap-3 text-sm font-medium"
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors duration-150 ${
                      formData.requestedServices.includes(service.value)
                        ? "border-black bg-black"
                        : "border-black/30 bg-white"
                    }`}
                    onClick={() => toggleService(service.value)}
                  >
                    {formData.requestedServices.includes(service.value) && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.requestedServices.includes(service.value)}
                    onChange={() => toggleService(service.value)}
                  />
                  {service.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-on-light inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              Next: Contact Details
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <section className="flex flex-col gap-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Your Name
              <input type="text" value={formData.clientName} onChange={(e) => updateField("clientName", e.target.value)} placeholder="Jane Smith" className={inputClass} />
            </label>
            <label className={labelClass}>
              Email Address
              <input type="email" value={formData.clientEmail} onChange={(e) => updateField("clientEmail", e.target.value)} placeholder="jane@example.com" className={inputClass} />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Phone Number
              <input type="tel" value={formData.clientPhone} onChange={(e) => updateField("clientPhone", e.target.value)} placeholder="(555) 000-0000" className={inputClass} />
            </label>
            <label className={labelClass}>
              Property Address
              <input type="text" value={formData.propertyAddress} onChange={(e) => updateField("propertyAddress", e.target.value)} placeholder="123 Main St, City, ST" className={inputClass} />
            </label>
          </div>

          <div className="border-t-2 border-black/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
              Agent Info (Optional)
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Agent Name
                <input type="text" value={formData.agentName} onChange={(e) => updateField("agentName", e.target.value)} placeholder="Agent name" className={inputClass} />
              </label>
              <label className={labelClass}>
                Agent Email
                <input type="email" value={formData.agentEmail} onChange={(e) => updateField("agentEmail", e.target.value)} placeholder="agent@example.com" className={inputClass} />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => { setCurrentStep(1); setErrorMessage(""); }}
              className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 text-sm font-semibold transition-colors hover:bg-black hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-on-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </section>
      )}

    </form>
  );
}
