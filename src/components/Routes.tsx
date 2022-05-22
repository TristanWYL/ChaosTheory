import { HistoryComponent } from "../pages/History";
import { AverageComponent } from "../pages/Average";
import { LatestComponent } from "../pages/Latest";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <div style={{ padding: "25px" }}>
      <Routes>
        <Route path="/history" element={<HistoryComponent />}></Route>
        <Route path="/average" element={<AverageComponent />}></Route>
        <Route path="/latest" element={<LatestComponent />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
