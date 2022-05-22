// This is the page showing history of a currency pair
import { getSymbols } from "../misc/remote";
import type { History } from "../misc/remote";
import { Rate } from "../misc/types";
import { Fragment, useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { RateSet } from "../misc/types";
import { useRatesObserver } from "../misc/state";

const formatXAxis: (tick_ms: number) => string = (tick_ms) => {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(tick_ms / 1000);
  let s = d.toLocaleString("zh-CN", { hour12: false });
  return s;
};

export const HistoryComponent = () => {
  const [rateSet, setRateSet] = useState<RateSet>([]);
  const symbols: Array<string> = rateSet[0] && Object.keys(rateSet[0].rate);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const historyData: Array<{ openTime: number; openPrice: number }> = [];
  rateSet.forEach(({ time, rate }) => {
    historyData.push({
      openTime: time,
      openPrice: rate[symbols[selectedIndex]],
    });
  });

  useRatesObserver((rateSet) => {
    setRateSet(rateSet);
  });

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  // get the data to be displayed

  return (
    <div>
      {rateSet.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div>
          <div style={{ zIndex: -1 }}>
            <Fragment>
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button onClick={() => {}}>{symbols[selectedIndex]}</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <div style={{ height: "250px", overflow: "auto" }}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {symbols.map((symbol, index) => (
                              <MenuItem
                                key={symbol}
                                // disabled={index === 2}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {symbol}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Fragment>
          </div>
          <div style={{ zIndex: -100, position: "relative" }}>
            <LineChart
              width={600}
              height={400}
              data={historyData}
              margin={{ top: 45, right: 45, bottom: 45, left: 45 }}
            >
              <Line type="monotone" dataKey="openPrice" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis
                dataKey="openTime"
                scale={"time"}
                type="number"
                tickFormatter={formatXAxis}
                domain={["dataMin", "dataMax"]}
              />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      )}
    </div>
  );
};
