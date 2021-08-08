import {useCallback, useMemo, useState} from "react"

interface Tag {
  name: string;
  en: string;
  zh: string;
}

function useTags (tags: Array<Tag>){
const allTagIds = useMemo(() => tags.map((itm) => itm.name), [tags]);
  const [tagIds, setTagIds] = useState(allTagIds);

  const handleTag = useCallback(
    (key: string) => {
      setTagIds((tagIds) => {
        if (tagIds.length === allTagIds.length) {
          // all were selected. now only select one
          return [key];
        }

        const isExist = !!tagIds.find((itm) => itm === key);
        const newKeys = isExist
          ? tagIds.filter((itm) => itm !== key)
          : [...tagIds, key];

        // after selectign this one, none were selected, then reset
        if (newKeys.length === 0) return allTagIds;

        return newKeys;
      });
    },
    [setTagIds, allTagIds]
  );

  return { tagIds, handleTag }

}

export default useTags;
