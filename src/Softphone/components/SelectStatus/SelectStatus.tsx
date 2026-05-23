import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Styles from "./styles";
import { Box, Typography } from "@mui/material";
import { ContactStatus } from "@/Softphone/context/Softphone/types";
import {
  STATUS,
  UNKNOWN_STATUS,
} from "@/Softphone/context/Softphone/constants";
import { Handlers } from "@/Softphone/types";
import {
  useSoftphoneDispatch,
  useSoftphone,
} from "@/Softphone/context/Softphone/context";

interface SelectStatusProps {
  onChangeStatus?: Handlers["onChangeStatus"];
}

export const SelectStatus = ({ onChangeStatus }: SelectStatusProps) => {
  const { status } = useSoftphone();
  const { setStatus } = useSoftphoneDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as ContactStatus);
    onChangeStatus?.(event.target.value as ContactStatus);
  };

  return (
    <Box mx={4} pt={1.5}>
      <FormControl fullWidth size="small">
        <InputLabel id="softphone-status">Status</InputLabel>
        <Select
          labelId="softphone-status"
          id="softphone-status-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem
            key={UNKNOWN_STATUS.value}
            value={UNKNOWN_STATUS?.value}
            style={{ display: "none" }}
          >
            <Box display={"flex"} alignItems={"baseline"}>
              <Styles.StatusCircle color={UNKNOWN_STATUS.color} />
              <Typography variant="caption" color="textSecondary">
                {UNKNOWN_STATUS.label}
              </Typography>
            </Box>
          </MenuItem>

          {/* Display Status and color */}
          {STATUS.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              <Box display={"flex"} alignItems={"baseline"}>
                <Styles.StatusCircle color={status.color} />
                <Typography variant="caption" color="textSecondary">
                  {status.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
