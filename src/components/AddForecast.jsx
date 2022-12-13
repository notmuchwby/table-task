import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddForecast = ({ setForecasts }) => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const addHandler = async () => {
    try {
      const response = await fetch(
        `http://195.210.47.140:8000/addNewForecastPlannerItem?dateOfSend=${value}&forecastStart=${value2}&forecastEnd=${value3}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      const newForecasts = await fetch(
        "http://195.210.47.140:8000/findAllForecastPlanerItems",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const res = await newForecasts.json();
      setForecasts(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>
        Добавить новую
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={"row"} spacing={2}>
          <DatePicker
            label="Дата ввода"
            value={value}
            onChange={(newValue) => {
              setValue(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Дата старта"
            value={value2}
            onChange={(newValue) => {
              setValue2(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Дата окончания"
            value={value3}
            onChange={(newValue) => {
              setValue3(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => addHandler()}>
        Добавить
      </Button>
    </>
  );
};

export default AddForecast;
