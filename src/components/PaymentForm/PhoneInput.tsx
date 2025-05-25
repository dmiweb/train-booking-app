import React, { useEffect, useState } from 'react';
import { TOrderOwner } from '../../models';

type PhoneInputProps = {
  value: string;
  fieldErrors: Array<{ field: string, error: string | undefined }>;
  handler: (key: keyof TOrderOwner, phone: string) => void;
}

const PhoneInput = ({ value, fieldErrors, handler }: PhoneInputProps) => {
  const [phone, setPhone] = useState(value);

  useEffect(() => {
    handler("phone", phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue += `+7 (`;
    }
    if (value.length > 1) {
      formattedValue += `${value.substring(1, 4)}`;
    }
    if (value.length > 4) {
      formattedValue += `) ${value.substring(4, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${value.substring(7, 9)}`;
    }
    if (value.length > 9) {
      formattedValue += `-${value.substring(9, 11)}`;
    }

    setPhone(formattedValue);
  };

  return (
    <div>
      <input
        type="tel"
        className={fieldErrors.find(f => f.field === "phone")
          ? "payment__input payment__input-error"
          : "payment__input"}
        name="phone"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="+7 (___) ___-__-__"
        pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
        maxLength={18}
        required
      />
    </div>
  );
};

export default PhoneInput;