export interface PayloadAction<Type, Payload> {
  type: Type;
  payload: Payload;
}

export interface SimpleAction<Type> {
  type: Type;
}

export interface ErrorAction<Type, Payload> {
  type: Type;
  payload: Payload;
  error: true;
}
