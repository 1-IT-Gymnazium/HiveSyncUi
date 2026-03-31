import {
  useCallback, useState,
} from "react";
import useApiContext from "../../../../context/api/useApiContext";
import ChipSelectOption from "../../../common/chip/ChipSelectOption";

const useSectionOptions = () => {
  const { sectionApi } = useApiContext();

  const [data, setData] = useState<ChipSelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const getSections = useCallback(async (projectId?: string) => {
    setLoading(true);
    try {
      const apiData = projectId ? await sectionApi.apiSectionProjectProjectIdGet({ projectId }) : await sectionApi.apiSectionGet();
      const mappedData: ChipSelectOption[] = apiData.map((section) => ({
        color: section.color,
        label: section.name,
        value: section.id,
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
  }, [sectionApi]);

  return {
    data,
    getSections,
    loading,
  };
};

export default useSectionOptions;
