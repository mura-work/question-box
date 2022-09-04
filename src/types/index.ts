type AlertStatusTypes = "info" | "warning" | "success" | "error";

export type AlertTypes = {
  displayAlert: boolean;
  message: string;
  status: AlertStatusTypes;
};
