import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import { SectionDetailDto } from "../../../../context/api";

const useSections = (projectId: string) => {
  const { sectionApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [data, setData] = useState<SectionDetailDto[]>();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getSections = useCallback(async () => {
    setLoading(true);
    try {
      const apiData = await sectionApi.apiSectionProjectProjectIdGet({ projectId });
      setData(apiData);
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "get-sections",
        type: "error",
      });
      setAlert(alertData);
      return [];
    }
    finally {
      setLoading(false);
    }
  }, [
    processAlert,
    projectId,
    sectionApi,
    setAlert,
  ]);

  const deleteSection = useCallback(async (id: string) => {
    setDeleting(true);
    try {
      await sectionApi.apiSectionIdDelete({ id });
      await getSections();
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "delete-section",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setDeleting(false);
    }
  }, [
    getSections,
    processAlert,
    sectionApi,
    setAlert,
  ]);

  return {
    data,
    deleteSection,
    deleting,
    getSections,
    loading,
  };
};

export default useSections;
