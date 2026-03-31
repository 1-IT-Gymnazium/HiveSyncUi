import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import theme from "../../../../theme";
import ChipSelectOption from "../../../common/chip/ChipSelectOption";

const useProjectOptions = () => {
  const { projectApi } = useApiContext();

  const [data, setData] = useState<ChipSelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const getProjects: () => Promise<ChipSelectOption[] | null> = useCallback(async () => {
    setLoading(true);
    try {
      const apiData = await projectApi.apiProjectGet();
      const mappedData = apiData.map((project) => ({
        color: project.color !== "DEFAULT" ? project.color : theme.palette.info.main,
        default: project.isDefault,
        label: project.name,
        value: project.id,
      }));
      setData(mappedData);
      return mappedData;
    }
    catch {
      return null;
    }
    finally {
      setLoading(false);
    }
  }, [projectApi]);

  return {
    data,
    getProjects,
    loading,
  };
};

export default useProjectOptions;
