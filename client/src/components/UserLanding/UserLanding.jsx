import React from "react";
import LineGraphNews from "../Graph/LineGraphNews";

import NewsList from "../News/NewsList";
import WatchTable from "./WatchTable";

import { useAuth } from "../../contexts/AuthContext";

export default function UserLanding() {
  const { currentUser } = useAuth();
  return (
    <div>
      <WatchTable userWatches={currentUser.watches}></WatchTable>
      User's page
    </div>
  );
}
