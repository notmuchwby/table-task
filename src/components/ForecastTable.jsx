import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const ForecastTable = ({ forecasts, setForecasts }) => {
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://195.210.47.140:8000/deleteForecastPlannerItemById?itemId=${id}`,
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Дата отправки</TableCell>
            <TableCell align="right">Прогноз на период</TableCell>
            <TableCell align="right">Операции</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecasts.map((forecast) => (
            <TableRow
              key={forecast.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {forecast.id}
              </TableCell>
              <TableCell align="right">{forecast.dateOfSend}</TableCell>
              <TableCell align="right">
                {forecast.forecastEnd} - {forecast.forecastStart}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteHandler(forecast.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForecastTable;
