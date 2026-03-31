import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import useAlert from "../../../../stores/useAlertStore";
import {
  ApiSectionIdPatchRequest, ApiSectionPostRequest, SectionDetailDto,
} from "../../../../context/api";

const useSectionDetail = () => {
  const { sectionApi } = useApiContext();
  const {
    processAlert, setAlert,
  } = useAlert();
  const [data, setData] = useState<SectionDetailDto>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);

  const getSection = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const apiData = await sectionApi.apiSectionIdGet({ id });
      setData(apiData);
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "get-section-detail",
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
    sectionApi,
    setAlert,
  ]);

  const createSection = useCallback(async (params: ApiSectionPostRequest) => {
    setCreating(true);
    try {
      await sectionApi.apiSectionPost(params);
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "create-section-detail",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setCreating(false);
    }
  }, [
    processAlert,
    sectionApi,
    setAlert,
  ]);

  const updateSection = useCallback(async (params: ApiSectionIdPatchRequest) => {
    setUpdating(true);
    try {
      await sectionApi.apiSectionIdPatch(params);
      return true;
    }
    catch (error) {
      const alertData = await processAlert({
        error,
        id: "update-section-detail",
        type: "error",
      });
      setAlert(alertData);
      return false;
    }
    finally {
      setUpdating(false);
    }
  }, [
    processAlert,
    sectionApi,
    setAlert,
  ]);

  return {
    createSection,
    creating,
    data,
    getSection,
    loading,
    updateSection,
    updating,
  };
};

export default useSectionDetail;
