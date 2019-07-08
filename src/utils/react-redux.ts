

export type PayloadAction<Type: string, Payload> = {
  type: Type,
  payload: Payload,
};

export type SimpleAction<Type: string> = {
  type: Type,
};

export type ErrorAction<Type: string, Payload = Error> = {
  type: Type,
  payload: Payload,
  error: true,
};
