import { useEffect, useState } from "react";

const useCheckForIdb = () => {
  const [isIdbAvailable, setIdbAvailable] = useState(false);
  useEffect(() => {
    const checkForIdb = async () => {
      if (!window.indexedDB) {
        setIdbAvailable(false);
      } else {
        // check for window.indexedDB.open?
        setIdbAvailable(true);
      }
    };
    checkForIdb();
  }, []);
  return isIdbAvailable;
};

export default useCheckForIdb;
