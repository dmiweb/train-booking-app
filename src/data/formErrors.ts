import { ErrorMessagesValidateForms } from "../models"

export const passengerFormErrors: Record<string, ErrorMessagesValidateForms> = {
  last_name: {
    valueMissing: 'Введите фамилию пассажира!',
  },
  first_name: {
    valueMissing: 'Введите имя пассажира!',
  },
  patronymic: {
    valueMissing: 'Введите отчество пассажира!',
  },
  gender: {
    radioChecked: 'Выберите пол пассажира!',
  },
  birthday: {
    valueMissing: 'Введите дату рождения!',
    rangeUnderflow: 'Некорректно введен год рождения!',
  },
  passport_series: {
    valueMissing: 'Введите серию паспорта!',
    patternMismatch: 'Серия паспорта должна содержать не более 4-х цифр!',
  },
  passport_number: {
    valueMissing: 'Введите номер паспорта!',
    patternMismatch: 'Номер паспорта должен содержать не более 6-ти цифр!',
  },
  birth_certificate: {
    valueMissing: 'Введите номер свидетельства о рождении!',
    patternMismatch: `Номер свидетельства о рожденнии указан некорректно! <br /> Пример: <b>VIII-ЫП-123456</b>`,
  }
}

export const ownerFormErrors: Record<string, ErrorMessagesValidateForms> = {
  last_name: {
    valueMissing: 'Введите фамилию пассажира!',
  },
  first_name: {
    valueMissing: 'Введите имя пассажира!',
  },
  patronymic: {
    valueMissing: 'Введите отчество пассажира!',
  },
  phone: {
    valueMissing: 'Введите номер телефона!',
    patternMismatch: 'Некорректно введен номер телефона!',
  },
  email: {
    valueMissing: 'Введите email адрес!',
    patternMismatch: 'Некорректно введен email адрес!',
  },
  payment_method: {
    radioChecked: 'Выберите способ оплаты!',
  }
}