import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-use';
import { LocationSensorState } from 'react-use/lib/useLocation';
import { useRecoilValue } from 'recoil';
import activeWindowAtom from '../_atoms/activeWindowAtom';
import appStateAtom from '../_atoms/appStateAtom';
import shortId from '../_helpers/shortId';
import useSetAppWindowState from '../_hooks/useSetAppWindowState';
import decodeWindowHash from './_helpers/decodeWindowHash';
import useAddTab from './_hooks/useAddTab';
import useReplaceWindowHash from './_hooks/useReplaceWindowHash';
import useSetSelectedTab from './_hooks/useSetSelectedTab';

function AppStateProvider() {
  const { tabs } = useRecoilValue(appStateAtom);
  const setAppWindowState = useSetAppWindowState();
  const addTab = useAddTab();
  const setSelectedTab = useSetSelectedTab();
  const replaceWindowHash = useReplaceWindowHash();
  const newLocation = useLocation();
  const activeWindow = useRecoilValue(activeWindowAtom);

  const handleLocationChange = useCallback(
    (location: LocationSensorState) => {
      const windowHash = decodeWindowHash(location);
      const foundURLTab = tabs.find((entry) => entry.id === windowHash.tabId);
      const foundExactInCache = tabs.find((entry) => {
        const { state, type } = entry.windows[0] || {};
        const tabId = entry.id;

        return (
          state === windowHash.state &&
          type === windowHash.type &&
          tabId === windowHash.tabId
        );
      });
      const foundIdInCache = tabs.find(
        (entry) => entry.id === windowHash.tabId
      );

      const windowState = {
        type: windowHash.type,
        state: windowHash.state ?? '',
        tabId: windowHash.tabId ?? shortId(),
      };

      switch (location?.trigger) {
        case 'load': {
          // Loading tab from URL
          if (foundExactInCache) {
            setSelectedTab(foundExactInCache.id);
            break;
          }

          // Add new tab from URL, i.e. shared link
          if (windowHash.tabId) {
            addTab({
              ...windowState,
              tabId: foundIdInCache ? shortId() : windowState.tabId,
            });

            break;
          }

          if (activeWindow) {
            replaceWindowHash(activeWindow);
            break;
          }

          replaceWindowHash(windowState);
          break;
        }
        case 'popstate':
        case 'pushstate': {
          // Navigating to an existing tab
          if (foundExactInCache) {
            setSelectedTab(windowState.tabId);
            break;
          }

          // Adding new tab
          if (!foundURLTab) {
            addTab(windowState);
            break;
          }

          // Navigating to next new state in tab
          setAppWindowState(
            {
              type: windowState.type,
              state: windowState.state,
            },
            windowState.tabId
          );
          break;
        }
        default:
      }
    },
    [
      activeWindow,
      addTab,
      replaceWindowHash,
      setAppWindowState,
      setSelectedTab,
      tabs,
    ]
  );

  useEffect(() => {
    handleLocationChange(newLocation);
  }, [newLocation]); // eslint-disable-line

  return null;
}

export default AppStateProvider;
