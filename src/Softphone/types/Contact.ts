import { ContactStatus } from "@/Softphone/context/Softphone/types";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { generateUUID } from "../utils";
import { colors } from "@mui/material";

type ContactConstructorArgs = {
  identity: string;
  id?: string;
  label?: string;
  isNew?: boolean;
  status?: ContactStatus;
  avatar?: string;
  type?: "phone" | "identifier";
  data?: Record<string, unknown>;
};

class Contact {
  identity: string;
  id: string;
  label: string;
  type: "phone" | "identifier" = "identifier";
  isNew?: boolean = false;
  status: Status;
  avatar?: string;
  data?: Record<string, unknown>;

  constructor(contactConstructorArgs: ContactConstructorArgs) {
    contactConstructorArgs.identity = contactConstructorArgs.identity.replace(
      /\s/g,
      ""
    );

    if (!Contact.validateIdentity(contactConstructorArgs.identity)) {
      throw new Error("Invalid identity");
    }

    this.identity = contactConstructorArgs.identity;
    this.id = contactConstructorArgs.id || generateUUID();
    this.label = this.getLabelFormatted(
      contactConstructorArgs.label || this.identity
    );

    this.type = isValidPhoneNumber(this.identity, "US")
      ? "phone"
      : "identifier";
    this.isNew = contactConstructorArgs.isNew;
    this.status = new Status(contactConstructorArgs.status);
    this.avatar = contactConstructorArgs.avatar || "/";
    this.data = contactConstructorArgs.data;
  }

  static buildContact(contact: ContactInput): Contact {
    if (!contact || !contact.identity) {
      throw new Error("Invalid contact");
    }

    return contact instanceof Contact ? contact : new Contact(contact);
  }

  static validateIdentity(identity: string): boolean {
    return !/\s/.test(identity);
  }

  private getLabelFormatted(label: string): string {
    return isValidPhoneNumber(label, "US")
      ? parsePhoneNumber(label, "US").format("NATIONAL").toString()
      : label;
  }

  public toJSON(): ContactConstructorArgs {
    return {
      identity: this.identity,
      id: this.id,
      label: this.label,
      data: this.data,
      isNew: this.isNew,
      status: this.status.status,
      avatar: this.avatar,
      type: this.type,
    };
  }

  public toStringify(): string {
    return JSON.stringify(this.toJSON());
  }
}

class Status {
  constructor(public status?: ContactStatus) {
    this.status = status || "unknown";
  }

  public get color(): string {
    switch (this.status) {
      case "available":
        return colors.blue[500];
      case "do-not-disturb":
        return colors.red[500];
      case "offline":
        return colors.blueGrey[500];
      default:
        return colors.grey[500];
    }
  }

  public get label(): string {
    switch (this.status) {
      case "available":
        return "Available";
      case "do-not-disturb":
        return "Do Not Disturb";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  }
}

export type ContactInput = ContactConstructorArgs | Contact;

export default Contact;
