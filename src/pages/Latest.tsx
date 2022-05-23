import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  selectIndexOfTimeframe,
  useObserver,
  updateSelectedIndexOfTimeframe,
} from "../misc/state";
import { RateSet } from "../misc/types";
import { useState } from "react";

export const LatestComponent = () => {
  const latest: {
    [symbol: string]: { price: number; changePercentage: string };
  } = {};
  const [rateSet, setRateSet] = useState<RateSet>([]);
  if (rateSet.length === 1) {
    for (const [k, v] of Object.entries(rateSet[0].rate)) {
      latest[k] = { price: v, changePercentage: "" };
    }
  } else if (rateSet.length > 1) {
    let ratePre = rateSet[rateSet.length - 2].rate;
    let rateLatest = rateSet[rateSet.length - 1].rate;
    for (const [k, v] of Object.entries(rateLatest)) {
      let sign = v > ratePre[k] ? "+" : "-";
      let percentage =
        sign + (Math.abs(v / ratePre[k] - 1) * 100).toFixed(5) + "%";
      latest[k] = { price: v, changePercentage: percentage };
    }
  }
  useObserver((state) => {
    setRateSet(state.rateSet);
  });
  return (
    <div>
      {Object.keys(latest).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} sx={{ width: 650 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pairs</TableCell>
                <TableCell align="right">Latest Prices</TableCell>
                <TableCell align="right">Change %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(latest).map((symbol) => (
                <TableRow
                  key={symbol}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                  >
                    {symbol}
                  </TableCell>
                  <TableCell align="right">{latest[symbol].price}</TableCell>
                  <TableCell align="right">
                    <span
                      style={{
                        color: latest[symbol].changePercentage.startsWith("-")
                          ? "red"
                          : "green",
                      }}
                    >
                      {latest[symbol].changePercentage}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
