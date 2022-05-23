import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const AverageComponent = () => {
  const [avgs, setAvgs] = useState<{ [k: string]: string }>({});
  console.log("AverageComponent" + "  " + Object.keys(avgs).length);
  useEffect(() => {
    // getAvgPrices().then((avgs) => setAvgs(avgs));
  }, []);
  return (
    <div>
      {Object.keys(avgs).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} sx={{ width: 650 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pairs</TableCell>
                <TableCell align="right">{"Prices (5min)"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(avgs).map((symbol) => (
                <TableRow
                  key={symbol}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {symbol}
                  </TableCell>
                  <TableCell align="right">{avgs[symbol]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
