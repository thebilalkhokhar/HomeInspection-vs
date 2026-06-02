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
  { value: "Standard Inspection", label: "Standard" },
  { value: "Radon Testing", label: "Radon" },
  { value: "Mold Testing", label: "Mold" },
];

const ageRanges = [
  { value: "0-5 years", label: "0-5 years" },
  { value: "6-15 years", label: "6-15 years" },
  { value: "16-30 years", label: "16-30 years" },
  { value: "30+ years", label: "30+ years" },
];

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
    if (
      !Number.isInteger(Number(formData.squareFootage)) ||
      Number(formData.squareFootage) <= 0
    ) {
      return "Square footage must be a positive number.";
    }
    if (!formData.propertyAgeRange) return "Property age range is required.";
    if (formData.requestedServices.length === 0)
      return "Select at least one service.";
    return "";
  }

  function validateStepTwo() {
    if (!formData.clientName.trim()) return "Client name is required.";
    if (!formData.clientEmail.trim()) return "Client email is required.";
    if (!formData.clientPhone.trim()) return "Client phone is required.";
    if (!formData.propertyAddress.trim())
      return "Property address is required.";
    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const stepTwoError = validateStepTwo();
    if (stepTwoError) {
      setErrorMessage(stepTwoError);
      return;
    }

    setIsLoading(true);
    // Demo mode: mock the backend request for client-ready presentation
    /*
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${apiBase}/api/v1/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: formData.clientName.trim(),
          client_email: formData.clientEmail.trim(),
          client_phone: formData.clientPhone.trim(),
          property_address: formData.propertyAddress.trim(),
          property_zip: formData.propertyZip.trim(),
          square_footage: Number(formData.squareFootage),
          property_age_range: formData.propertyAgeRange,
          requested_services: formData.requestedServices,
          agent_name: formData.agentName.trim() || null,
          agent_email: formData.agentEmail.trim() || null,
        }),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.detail ||
            responseData?.message ||
            "Unable to submit the quote request.",
        );
      }

      setSuccessMessage(
        "Your request was submitted successfully. We will be in touch soon.",
      );
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (submissionError) {
      setErrorMessage(
        submissionError instanceof Error
          ? submissionError.message
          : "Submission failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
    */

    // Mock flow for demo: 1.5s loading then success overlay/message
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        "Quote Request Received! An inspector will review your property specs and text/email your quote within 2 hours.",
      );
      setFormData(initialFormData);
      setCurrentStep(1);
    }, 1500);
  }

  function handleNextStep() {
    const stepOneError = validateStepOne();
    if (stepOneError) {
      setErrorMessage(stepOneError);
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setCurrentStep(2);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {successMessage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">
              Quote Request Received
            </h3>
            <p className="mt-3 text-sm text-muted">
              An inspector will review your property specs and text/email your
              quote within 2 hours.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSuccessMessage("")}
                className="btn-on-light inline-flex items-center justify-center px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Step {currentStep} of 2</span>
        <span className="rounded-full bg-surface px-3 py-1 font-medium text-foreground">
          {currentStep === 1 ? "Property Metrics" : "Contact Details"}
        </span>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          {successMessage}
        </div>
      ) : null}

      {currentStep === 1 ? (
        <section className="w-full space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Zip Code
              <input
                type="text"
                inputMode="numeric"
                value={formData.propertyZip}
                onChange={(event) =>
                  updateField("propertyZip", event.target.value)
                }
                placeholder="12345"
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Square Footage
              <input
                type="number"
                min="1"
                value={formData.squareFootage}
                onChange={(event) =>
                  updateField("squareFootage", event.target.value)
                }
                placeholder="2400"
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Property Age Range
              <select
                value={formData.propertyAgeRange}
                onChange={(event) =>
                  updateField("propertyAgeRange", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
              >
                <option value="">Select age range</option>
                {ageRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="grid gap-3 text-sm font-medium text-foreground">
              <legend>Requested Services</legend>
              <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4">
                {serviceOptions.map((service) => (
                  <label
                    key={service.value}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={formData.requestedServices.includes(
                        service.value,
                      )}
                      onChange={() => toggleService(service.value)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    {service.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-on-light inline-flex items-center px-6 py-3 text-sm font-semibold"
            >
              Next: Contact Details
            </button>
          </div>
        </section>
      ) : (
        <section className="w-full space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Client Name
              <input
                type="text"
                value={formData.clientName}
                onChange={(event) =>
                  updateField("clientName", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Client Email
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(event) =>
                  updateField("clientEmail", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Client Phone
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(event) =>
                  updateField("clientPhone", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Property Address
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(event) =>
                  updateField("propertyAddress", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Real Estate Agent Name
              <input
                type="text"
                value={formData.agentName}
                onChange={(event) =>
                  updateField("agentName", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Agent Email
              <input
                type="email"
                value={formData.agentEmail}
                onChange={(event) =>
                  updateField("agentEmail", event.target.value)
                }
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted focus:border-primary"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-on-light inline-flex items-center justify-center px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-3 h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </section>
      )}
    </form>
  );
}
