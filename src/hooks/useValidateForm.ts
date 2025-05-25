import { useState } from "react";
import { ErrorMessagesValidateForms } from "../models";

export const useValidateForm = (errors: Record<string, ErrorMessagesValidateForms>) => {
  const [fieldErrors, setFieldErrors] = useState<Array<{ field: string, error: string | undefined }>>([]);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (form: React.FormEvent<HTMLFormElement> | HTMLFormElement): boolean => {
    if (form && 'preventDefault' in form) {
      form.preventDefault();
    }

    const currentForm = form instanceof HTMLFormElement
      ? form
      : (form as React.FormEvent<HTMLFormElement>).currentTarget;

    setFieldErrors([]);
    setIsValid(false);

    const newErrors: Array<{ field: string, error: string | undefined }> = [];

    const formElements = Array.from(currentForm.elements) as HTMLInputElement[];

    formElements.forEach((element: HTMLInputElement) => {
      if (!element.name || element.validity.valid) return;

      if (element.type === 'radio' && element.name) {
        const groupName = element.name;
        const radioGroup = formElements.filter(el => el.type === 'radio' && el.name === groupName);

        const isAnyChecked = radioGroup.some(radio => radio.checked);

        if (isAnyChecked) {
          return;
        } else {
          newErrors.push({
            field: element.name,
            error: errors[element.name]["radioChecked" as keyof ErrorMessagesValidateForms],
          });
        }
      } else {
        Object.keys(ValidityState.prototype).forEach((key: string) => {
          const validityKey = key as keyof ValidityState;

          if ((element as HTMLInputElement).validity[validityKey]) {
            newErrors.push({ field: element.name, error: errors[element.name][validityKey as keyof ErrorMessagesValidateForms] })
          }
        });
      }

    });
    setFieldErrors(newErrors);
    setIsValid(newErrors.length === 0);
    return newErrors.length === 0;
  }

  const getFieldError = (field: string) => {
    const fieldError = fieldErrors.find(f => f.field === field);

    return fieldError?.error;
  }

  return { isValid, fieldErrors, validateForm, getFieldError };
}

