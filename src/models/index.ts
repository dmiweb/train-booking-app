export type RetryRequestConfig = {
  initialDelay: number;
  maxDelay: number;
  exponent: number;
}

export type CustomError = Error & {
  status?: number;
}

export type ErrorMessagesValidateForms = {
  valueMissing?: string;
  typeMismatch?: string;
  patternMismatch?: string;
  rangeUnderflow?: string;
  rangeOverflow?: string;
  radioChecked?: string;
};

export type TQueryParams = {
  limit: number;
  offset: number;
  sort: string;
  from_city_id: string;
  to_city_id: string;
  date_start: string;
  date_end: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_express: boolean;
  price_from: number;
  price_to: number;
  start_departure_hour_from: number;
  start_arrival_hour_from: number;
  start_departure_hour_to: number;
  start_arrival_hour_to: number;
  end_departure_hour_from: number,
  end_departure_hour_to: number,
  end_arrival_hour_from: number,
  end_arrival_hour_to: number,
  have_air_conditioning: boolean;
}

export type TGetParams = {
  limit?: string;
  offset?: string;
  sort?: string;
  from_city_id?: string;
  to_city_id?: string;
  date_start?: string;
  date_end?: string;
  have_first_class?: string;
  have_second_class?: string;
  have_third_class?: string;
  have_fourth_class?: string;
  have_wifi?: string;
  have_express?: string;
  price_from?: string;
  price_to?: string;
  start_departure_hour_from?: string;
  start_arrival_hour_from?: string;
  start_departure_hour_to?: string;
  start_arrival_hour_to?: string;
  end_departure_hour_from?: string,
  end_departure_hour_to?: string,
  end_arrival_hour_from?: string,
  end_arrival_hour_to?: string,
  have_air_conditioning?: boolean;
}

export type TCities = {
  _id: string;
  name: string;
};

export type TMenuItem = {
  label: string;
  link: string;
};

export type TLastTicket = {
  have_first_class: boolean,
  have_second_class: boolean,
  have_third_class: boolean,
  have_fourth_class: boolean,
  have_wifi: boolean,
  have_air_conditioning: boolean,
  is_express: boolean,
  min_price: number,
  available_seats: number,
  available_seats_info: {
    third: number,
    fourth: number
  },
  departure: {
    _id: string,
    have_first_class: boolean,
    have_second_class: boolean,
    have_third_class: boolean,
    have_fourth_class: boolean,
    have_wifi: boolean,
    have_air_conditioning: boolean,
    is_express: boolean,
    min_price: number,
    duration: number,
    available_seats: number,
    available_seats_info: {
      first: number,
      second: number,
      third: number,
      fourth: number
    },
    train: {
      _id: string,
      name: string
    },
    from: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    to: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    price_info: {
      third: {
        top_price: number,
        bottom_price: number,
        side_price: number
      },
      fourth: {
        top_price: number,
        bottom_price: number
      }
    }
  }
}

export type TTrainsData = {
  total_count: number;
  items: TTrain[];
}

export type TTrain = {
  have_first_class: boolean,
  have_second_class: boolean,
  have_third_class: boolean,
  have_fourth_class: boolean,
  have_wifi: boolean,
  have_air_conditioning: boolean,
  is_express: boolean,
  min_price: number,
  available_seats: number,
  available_seats_info: {
    first: number,
    second: number
    third: number,
    fourth: number
  },
  arrival: {
    _id: string,
    have_first_class: boolean,
    have_second_class: boolean,
    have_third_class: boolean,
    have_fourth_class: boolean,
    have_wifi: boolean,
    have_air_conditioning: boolean,
    train: {
      _id: string,
      name: string
    },
    from: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    to: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    min_price: number,
    duration: number,
    price_info: {
      first: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      second: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      third: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      fourth: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      }
    },
    seats_info: {
      first: number,
      second: number,
      third: number,
      fourth: number
    }
  },
  departure: {
    _id: string,
    have_first_class: boolean,
    have_second_class: boolean,
    have_third_class: boolean,
    have_fourth_class: boolean,
    have_wifi: boolean,
    have_air_conditioning: boolean,
    train: {
      _id: string,
      name: string
    },
    from: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    to: {
      railway_station_name: string,
      city: {
        _id: string,
        name: string
      },
      datetime: number
    },
    min_price: number,
    duration: number,
    price_info: {
      first: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      second: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      third: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      },
      fourth: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
        linens_price: number,
        wifi_price: number
      }
    },
    seats_info: {
      first: number,
      second: number,
      third: number,
      fourth: number
    }
  },
  total_avaliable_seats: number
}

export type TCoach = {
  coach: TSeat;
  coachNumber: string;
}

export type TSeat = {
  coach: {
    _id: string,
    name: string,
    class_type: string,
    have_wifi: boolean,
    have_air_conditioning: boolean,
    price: number,
    top_price: number,
    bottom_price: number,
    side_price: number,
    linens_price: number,
    wifi_price: number,
    available_seats: number,
    is_linens_included: boolean,
  },
  seats: [
    {
      index: number,
      available: boolean
    }
  ]
}

export type TSelectedSeat = {
  coach_id: string;
  seat_number: number;
  is_adult: boolean;
  is_child: boolean;
  include_children_seat: boolean;
  price: number;
}

export type TSelectedOptions = {
  conditioner: "included" | "unselected" | "selected";
  wifi: "included" | "unselected" | "selected";
  linens: "included" | "unselected" | "selected";
  food: "unselected" | "selected";
}

export type TPassengerInfo = {
  coach_id: string;
  person_info: {
    is_adult: boolean;
    first_name: string;
    last_name: string;
    patronymic: string;
    gender: string;
    birthday: string;
    document_type: string;
    document_data: string;
  },
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
}

export type TPassengers = {
  route_direction_id: string;
  seats: TPassengerInfo[];
}

export type TOrderOwner = {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: string;
}

export type TOrderCompleted = {
  user: TOrderOwner;
  departure: TPassengers;
  arrival: TPassengers;
}

export type TTrainState = {
  trains: TTrainsData;
  page: number;
  minPrice: number,
  maxPrice: number,
  selectedTrain: TTrain | TLastTicket | null;
  directionFromId: string;
  directionToId: string;
  loading: boolean;
  error: string | null;
}

export type TСitiesState = {
  cities: TCities[];
  cityDeparture: string;
  cityArrival: string;
  citiesLoading: boolean;
  citiesError: string | null;
}

export type TLastTicketsState = {
  lastTickets: TLastTicket[];
  lastTicketsLoading: boolean;
  lastTicketsError: string | null;
}

export type TSeatsState = {
  seatsFrom: TSeat[];
  seatsTo: TSeat[];
  activeTypeSeat: {
    from: string;
    to: string;
  },
  activeTypeCoach: {
    from: string;
    to: string;
  },
  optionsService: {
    from: TSelectedOptions,
    to: TSelectedOptions,
  },
  openedCoaches: { from: string[], to: string[] },
  limitPassenger: number,
  adultPassenger: number,
  childPassenger: number,
  childNoSeat: number,
  selectedSeats: {
    from: TSelectedSeat[],
    to: TSelectedSeat[],
  },
  loading: boolean;
  error: string | null;
}

export type TPassengersState = {
  departure: TPassengers;
  arrival: TPassengers;
}

export type subscribeState = {
  subscribeStatus: boolean,
  loading: boolean,
  error: string | null,
}

export type TOrderState = {
  owner: TOrderOwner
  order: TOrderCompleted | null;
  loading: boolean;
  error: string | null;
  orderStatus: boolean;
}

export type TRootState = {
  trains: TTrainState;
  cities: TСitiesState;
  lastTickets: TLastTicketsState;
  subscribe: subscribeState;
  order: TOrderState;
};