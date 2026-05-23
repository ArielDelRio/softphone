import { TwilioError } from "@twilio/voice-sdk";

type TwilioErrorHandled = {
  type: "error";
  message: string;
  context: string;
};

class TwilioErrorsHandler {
  public handle = (
    twilioError: TwilioError.TwilioError
  ): TwilioErrorHandled => {
    console.log({ twilioError });
    switch (twilioError.name || twilioError.code) {
      case "Decline": {
        return {
          type: "error",
          message: "The call was declined.",
          context: JSON.stringify(twilioError),
        };
      }
      default: {
        return {
          type: "error",
          message: "An error occurred.",
          context: JSON.stringify(twilioError),
        };
      }
    }
  };
}

export default TwilioErrorsHandler;
