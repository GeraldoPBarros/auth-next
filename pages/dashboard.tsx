import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContexts";
import { useCan } from "../hooks/useCan";

import { withSSRAuth } from "../pages/utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  /* const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
  }); */

  useEffect(() => {
    api
      .get("/me")
      .then((response) => {
        console.log(response, "DASHBOARD");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = apiClient.get("/me");

  return {
    props: {},
  };
});
