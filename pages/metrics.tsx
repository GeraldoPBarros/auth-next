import { withSSRAuth } from "../pages/utils/withSSRAuth";
import { setupAPIClient } from "../services/api";

export default function Metrics() {
  return (
    <>
      <div>Métricas</div>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
