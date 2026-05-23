import { Device } from "@twilio/voice-sdk";
import { InitialState, SoftphoneDispatch, ContactStatus } from "./types";
import { Contact } from "@/Softphone/types";
import { colors } from "@mui/material";

export const STATUS: { value: ContactStatus; label: string; color: string }[] =
  [
    { value: "available", label: "Available", color: colors.blue[500] },
    {
      value: "do-not-disturb",
      label: "Do not Disturb",
      color: colors.red[500],
    },
  ];

export const UNKNOWN_STATUS = {
  value: "unknown",
  label: "Unknown",
  color: colors.grey[500],
};

export const INITIAL_STATE: InitialState = {
  view: "active",
  status: "unknown",
  contact: new Contact({ identity: "" }),
};

export const SOFTPHONE_DISPATCH: SoftphoneDispatch = {
  setView: () => {},
  setStatus: () => {},
  setAlert: () => {},
  clearAlert: () => {},
  initializeDevice: () => {},
  destroyDevice: () => {},
  selectContact: () => {},
  clearSelectedContact: () => {},
  makeCall: () => {},
  hangUp: () => {},
  updateCallAction: () => {},
  setLedIndicator: () => {},
};

export const TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN = 300000; // each 5 min;
const TIME_TO_CHECK_TOKEN_WILL_EXPIRE = 7200000; // 2 hr

export const DEVICE_OPTIONS: Device.Options = {
  // logLevel: "DEBUG",
  closeProtection: true,
  tokenRefreshMs: TIME_TO_CHECK_TOKEN_WILL_EXPIRE,
  enableImprovedSignalingErrorPrecision: true,
};
