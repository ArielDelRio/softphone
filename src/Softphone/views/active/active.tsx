import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import RefreshIcon from "@mui/icons-material/Refresh";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { ActionButton } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Stack } from "@/Softphone/layouts/Stack";
import { Box, Tooltip, Typography } from "@mui/material";

const ActiveView = () => {
  const { setView, setAlert, clearAlert } = useSoftphoneDispatch();
  const { device } = useSoftphone();

  const isDeviceUnregistered = device?.state === "unregistered";

  const handleRegisterDevice = async () => {
    try {
      setAlert({
        message: "Registering device...",
        type: "info",
      });

      await device?.register();
      clearAlert();
    } catch (error) {
      setAlert({
        message: "Failed to register device",
        type: "error",
      });
    }
  };

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isDeviceUnregistered ? (
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <PhoneDisabledIcon sx={{ fontSize: "10rem" }} color="error" />
            <Typography variant="body2" color="error">
              Device is not registered and cannot receive calls.
            </Typography>
          </Box>
        ) : (
          <LocalPhoneIcon sx={{ fontSize: "10rem" }} color="disabled" />
        )}
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        {isDeviceUnregistered ? (
          <Tooltip title="Register device">
            <span>
              <ActionButton
                color="info"
                onClick={handleRegisterDevice}
                icon={<RefreshIcon fontSize="large" />}
              />
            </span>
          </Tooltip>
        ) : (
          <ActionButton
            color="primary"
            onClick={() => setView("lookup")}
            icon={<DialpadIcon fontSize="large" />}
          />
        )}
      </Stack.Segment>
    </Stack>
  );
};
export default ActiveView;
